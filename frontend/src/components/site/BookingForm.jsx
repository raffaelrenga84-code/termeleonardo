import { useState } from "react";
import axios from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Reveal, Label } from "./Reveal";
import { ROOM_TYPES, OFFERS } from "../../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const empty = {
  nome: "", email: "", telefono: "",
  check_in: "", check_out: "", ospiti: 2,
  tipo_camera: "", pacchetto: "", messaggio: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.nome || !form.email || !form.check_in || !form.check_out) {
      setError("Compila i campi obbligatori: nome, email e date del soggiorno.");
      return;
    }
    setStatus("loading");
    try {
      await axios.post(`${API}/bookings`, { ...form, ospiti: Number(form.ospiti) });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      setError("Si è verificato un errore. Riprova tra poco.");
    }
  };

  return (
    <section id="prenota" data-testid="booking-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <Reveal className="lg:col-span-2">
            <Label>Prenota</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">
              Richiedi il tuo soggiorno
            </h2>
            <p className="text-[#5A5A5A] text-lg mt-6">
              Compila il modulo e il nostro staff ti ricontatterà con una proposta
              su misura per la tua vacanza benessere ad Abano Terme.
            </p>
            <div className="mt-10 space-y-2 text-[#1A3626]">
              <p className="font-semibold">Hotel Terme Leonardo</p>
              <p className="text-sm text-[#5A5A5A]">Monteortone · Abano Terme (PD)</p>
              <p className="text-sm text-[#5A5A5A]">Colli Euganei, Veneto — Italia</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.15}>
            {status === "success" ? (
              <div data-testid="booking-success" className="bg-white rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center border border-[#E5E0D8]">
                <CheckCircle2 className="text-[#1A3626]" size={56} />
                <h3 className="font-serif-display text-3xl text-[#1A3626] mt-5">Richiesta ricevuta!</h3>
                <p className="text-[#5A5A5A] mt-3 max-w-sm">
                  Grazie {form.nome.split(" ")[0]}. Abbiamo ricevuto la tua richiesta di
                  prenotazione e ti risponderemo all'indirizzo <b>{form.email}</b> il prima possibile.
                </p>
                <button
                  data-testid="booking-reset"
                  onClick={() => { setForm(empty); setStatus("idle"); }}
                  className="mt-8 rounded-full border border-[#1A3626] text-[#1A3626] px-7 py-3 text-sm font-semibold hover:bg-[#1A3626] hover:text-white transition-colors"
                >
                  Nuova richiesta
                </button>
              </div>
            ) : (
              <form data-testid="booking-form" onSubmit={submit} className="bg-white rounded-2xl p-7 md:p-9 border border-[#E5E0D8] space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nome e cognome *">
                    <input data-testid="booking-nome" value={form.nome} onChange={set("nome")} className={inputCls} placeholder="Mario Rossi" />
                  </Field>
                  <Field label="Email *">
                    <input data-testid="booking-email" type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="mario@email.it" />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Telefono">
                    <input data-testid="booking-telefono" value={form.telefono} onChange={set("telefono")} className={inputCls} placeholder="+39 ..." />
                  </Field>
                  <Field label="Ospiti">
                    <input data-testid="booking-ospiti" type="number" min="1" max="10" value={form.ospiti} onChange={set("ospiti")} className={inputCls} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Check-in *">
                    <input data-testid="booking-checkin" type="date" value={form.check_in} onChange={set("check_in")} className={inputCls} />
                  </Field>
                  <Field label="Check-out *">
                    <input data-testid="booking-checkout" type="date" value={form.check_out} onChange={set("check_out")} className={inputCls} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Tipo di camera">
                    <select data-testid="booking-camera" value={form.tipo_camera} onChange={set("tipo_camera")} className={inputCls}>
                      <option value="">Seleziona…</option>
                      {ROOM_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Pacchetto">
                    <select data-testid="booking-pacchetto" value={form.pacchetto} onChange={set("pacchetto")} className={inputCls}>
                      <option value="">Nessuno / da definire</option>
                      {OFFERS.map((o) => <option key={o.title} value={o.title}>{o.title}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Messaggio">
                  <textarea data-testid="booking-messaggio" value={form.messaggio} onChange={set("messaggio")} rows={3} className={inputCls} placeholder="Richieste particolari…" />
                </Field>

                {error && <p data-testid="booking-error" className="text-sm text-red-700">{error}</p>}

                <button
                  data-testid="booking-submit"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-[#1A3626] text-[#F9F6F0] py-4 font-semibold hover:bg-[#B08D57] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? <><Loader2 className="animate-spin" size={18} /> Invio…</> : "Invia richiesta"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#E5E0D8] bg-[#F9F6F0] px-4 py-3 text-[#1C1C1C] outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-transparent transition-shadow";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-wider text-[#5A5A5A] font-semibold">{label}</span>
    <div className="mt-2">{children}</div>
  </label>
);
