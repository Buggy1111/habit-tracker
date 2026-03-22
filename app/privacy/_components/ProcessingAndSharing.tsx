import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataProcessingSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">
          3. Proč zpracováváme vaše údaje (právní základ)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-white">
              ✅ Plnění smlouvy (čl. 6 odst. 1 písm. b GDPR)
            </h4>
            <p className="text-sm pl-4">
              Poskytování služby habit trackingu, ukládání vašich návyků, výpočet statistik
              (Habit Strength, Neuroplasticity, Extinction Burst)
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">
              ✅ Oprávněný zájem (čl. 6 odst. 1 písm. f GDPR)
            </h4>
            <p className="text-sm pl-4">
              Zabezpečení služby, prevence podvodů, vylepšování funkcí, technická podpora
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">
              ✅ Souhlas (čl. 6 odst. 1 písm. a GDPR)
            </h4>
            <p className="text-sm pl-4">
              Marketing (newsletter), analytické cookies (můžete kdykoli odvolat)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ThirdPartiesSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">4. Sdílení údajů se třetími stranami</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-4">
        <p>Vaše osobní údaje sdílíme POUZE s:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Hosting provider:</strong> Vercel (USA) - hosting aplikace, certifikace
            Privacy Shield
          </li>
          <li>
            <strong>Database provider:</strong> Supabase/Neon (EU) - ukládání dat v EU
          </li>
          <li>
            <strong>Error tracking:</strong> Sentry (USA) - monitoring chyb (anonymizované
            logy)
          </li>
          <li>
            <strong>Email service:</strong> Resend (EU) - odesílání transakcí emailů
            (verifikace, reset hesla)
          </li>
        </ul>
        <p className="text-sm text-slate-400 mt-4">
          ⚠️ <strong>NIKDY</strong> neprodáváme vaše data třetím stranám pro marketingové
          účely.
        </p>
      </CardContent>
    </Card>
  )
}

export function DataRetentionSection() {
  return (
    <Card className="mb-6 bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">5. Jak dlouho uchováváme vaše data</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 space-y-3">
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Účet aktivní:</strong> Po dobu trvání účtu + 30 dní po smazání (backup)
          </li>
          <li>
            <strong>Účet neaktivní:</strong> 2 roky nečinnosti → upozornění → 30 dní → smazání
          </li>
          <li>
            <strong>Logy a analytics:</strong> 90 dní (automatické mazání)
          </li>
          <li>
            <strong>Platební záznamy:</strong> 10 let (daňová povinnost dle zákona)
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
