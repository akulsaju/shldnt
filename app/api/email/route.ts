import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type EmailRequest = {
  to?: string
  subject?: string
  html?: string
  replyTo?: string
  organizationId?: string
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!apiKey) {
    return NextResponse.json({ error: 'Resend is not configured on the server.' }, { status: 503 })
  }

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ error: 'Authentication is required to send email.' }, { status: 401 })
  }

  let payload: EmailRequest
  try {
    payload = await request.json() as EmailRequest
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (!payload.to || !payload.subject || !payload.html) {
    return NextResponse.json({ error: 'to, subject, and html are required.' }, { status: 400 })
  }

  if (!payload.organizationId) {
    return NextResponse.json({ error: 'organizationId is required.' }, { status: 400 })
  }

  const { data: membership, error: membershipError } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('organization_id', payload.organizationId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (membershipError) {
    return NextResponse.json({ error: 'Unable to verify organization access.' }, { status: 500 })
  }

  if (!membership) {
    return NextResponse.json({ error: 'You do not have access to this organization.' }, { status: 403 })
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 })
  }

  return NextResponse.json({ id: data?.id })
}
