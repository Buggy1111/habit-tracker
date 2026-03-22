import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function RegistrationSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">3. Registrace a účet</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">3.1 Podmínky registrace:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Musíte být starší 16 let (nebo mít souhlas zákonného zástupce)</li>
            <li>Musíte poskytnout pravdivé údaje (e-mail, jméno)</li>
            <li>Můžete mít pouze jeden účet</li>
            <li>Heslo musí mít minimálně 8 znaků</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">3.2 Zodpovědnost za účet:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Jste zodpovědní za utajení hesla</li>
            <li>Jste zodpovědní za veškerou aktivitu na vašem účtu</li>
            <li>Podezření na narušení zabezpečení hlaste okamžitě</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Varování</h4>
              <p className="text-sm">
                Sdílení účtu s třetími osobami je zakázáno. Při podezření na zneužití můžeme
                účet zablokovat.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PaymentSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">4. Platby a předplatné</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">4.1 Cenové plány:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Free tier:</strong> Zdarma navždy
            </li>
            <li>
              <strong>Premium měsíční:</strong> 120 Kč/měsíc (automaticky obnovováno)
            </li>
            <li>
              <strong>Premium roční:</strong> 1 000 Kč/rok (~83 Kč/měsíc, ušetříte 30%)
            </li>
            <li>
              <strong>Lifetime:</strong> 2 500 Kč jednorázově (limitované sloty)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">4.2 Platební podmínky:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Platby přes Stripe (VISA, Mastercard, Apple Pay, Google Pay)</li>
            <li>Měsíční plán se automaticky obnovuje každý měsíc</li>
            <li>Roční plán se automaticky obnovuje každý rok</li>
            <li>Ceny jsou uvedeny včetně 21% DPH</li>
            <li>Faktura je zaslána e-mailem</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">4.3 Zrušení předplatného:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Můžete zrušit kdykoli v Nastavení → Předplatné</li>
            <li>Po zrušení máte přístup do konce zaplacené periody</li>
            <li>Po skončení periody účet přejde na Free tier</li>
            <li>Data zůstávají zachována (ale omezena na 5 návyků)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">4.4 Refundační politika:</h3>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-sm">
              <strong>14-denní záruka vrácení peněz</strong> - pokud nejste spokojeni, vrátíme
              100% ceny do 14 dnů od zakoupení. Stačí napsat na{" "}
              <a
                href="mailto:refund@habit-tracker.cz"
                className="text-indigo-400 hover:underline"
              >
                refund@habit-tracker.cz
              </a>
            </p>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Po 14 dnech refund není možný (kromě závažných technických problémů na naší
            straně).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
