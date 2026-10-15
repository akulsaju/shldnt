const reimbursementUrl = '/reimbursement-frame/reimbursement/start/whf'

export default function Page() {
  return (
    <main className="h-screen w-full overflow-hidden bg-white">
      <iframe
        src={reimbursementUrl}
        title="WHF reimbursement portal"
        className="h-full w-full border-0"
        allow="clipboard-write; payment"
      />
    </main>
  )
}
