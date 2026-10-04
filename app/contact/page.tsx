"use client";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [details,setDetails]=useState({email:"papaslovechildrenministry@gmail.com",phone:"+256 774615784",alternatePhone:"+256709196703",location:"Naama Village, Mityana, Uganda"});
  useEffect(()=>{const endpoint=(process.env.NEXT_PUBLIC_API_URL?.trim()||"https://plcmbackend.up.railway.app/graphql").replace(/\//$/,"");fetch(endpoint.endsWith("/graphql")?endpoint:endpoint+"/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"{ publicSiteSettings { email phone alternatePhone location } }"})}).then(r=>r.json()).then(p=>{if(p.data?.publicSiteSettings)setDetails(p.data.publicSiteSettings)}).catch(()=>{});},[]);
  const [prepared, setPrepared] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPrepared(false); setSending(true);
    const form = event.currentTarget; const data = new FormData(form);
    const configured = (process.env.NEXT_PUBLIC_API_URL?.trim() || "https://plcmbackend.up.railway.app/graphql").replace(/\/$/, "");
    const api = configured.endsWith("/graphql") ? configured : configured + "/graphql";
    try {
      const response = await fetch(api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"mutation SubmitContact($input: ContactInput!) { submitContact(input: $input) { success } }",variables:{input:{name:String(data.get("name")||""),email:String(data.get("email")||""),phone:String(data.get("phone")||""),country:String(data.get("country")||""),subject:String(data.get("topic")||""),message:String(data.get("message")||"")}}})});
      const payload=await response.json();
      if(!response.ok||payload.errors?.length||!payload.data?.submitContact?.success) throw new Error(payload.errors?.[0]?.message||"We could not send your message. Please try again.");
      form.reset(); setPrepared(true);
    } catch(e) { setError(e instanceof Error?e.message:"Unable to send your message."); }
    finally { setSending(false); }
  }
  return <main className="contact-page">
    <section className="contact-hero">
      <div className="contact-hero-pattern" aria-hidden="true"/>
      <div className="contact-wrap contact-hero-grid">
        <div className="contact-hero-copy">
          <span className="contact-eyebrow"><span/> WE’RE HERE TO LISTEN</span>
          <h1>Let’s start a <em>conversation</em> that changes lives.</h1>
          <p>Questions, partnership ideas, prayer, or a simple hello—we’d love to hear from you. Reach out to Papa’s Love Children’s Ministry.</p>
          <a className="contact-hero-link" href="#contact-form">Send us a message <ArrowRight size={17}/></a>
          <div className="contact-hero-note"><span className="contact-note-icon"><MessageCircle size={18}/></span><span><b>Every message matters.</b><small>We welcome friends and supporters from Uganda and around the world.</small></span></div>
        </div>
        <div className="contact-hero-photo">
          <img src="/images/papas-love-about-us.png" alt="Children and caregivers at Papa’s Love Children’s Ministry"/>
          <div className="contact-photo-sticker"><span>♡</span><b>Hope grows<br/>when we connect.</b></div>
          <div className="contact-photo-caption"><span className="contact-live-dot"/> A home for hope in Mityana, Uganda</div>
        </div>
      </div>
    </section>
    <section className="contact-details-section">
      <div className="contact-wrap">
        <div className="contact-section-heading"><span className="contact-eyebrow dark">GET IN TOUCH</span><h2>We’re only a message away.</h2><p>Choose the easiest way to connect with our team.</p></div>
        <div className="contact-detail-grid">
          <a className="contact-detail-card" href={"tel:"+details.phone.replace(/\s/g,"")}><span className="contact-detail-icon"><Phone/></span><small>CALL US</small><strong>{details.phone}</strong><span>Speak with our ministry team</span></a>
          <a className="contact-detail-card" href={"tel:"+details.alternatePhone.replace(/\s/g,"")}><span className="contact-detail-icon pink-icon"><Phone/></span><small>CALL / WHATSAPP</small><strong>{details.alternatePhone}</strong><span>Connect with us directly</span></a>
          <a className="contact-detail-card" href={"mailto:"+details.email}><span className="contact-detail-icon gold-icon"><Mail/></span><small>EMAIL US</small><strong className="contact-email">{details.email}</strong><span>For questions and partnerships</span></a>
          <article className="contact-detail-card contact-address-card"><span className="contact-detail-icon"><MapPin/></span><small>OUR HOME</small><strong>{details.location.split(",")[0]}, {details.location.split(",")[1]?.trim()}</strong><span>{details.location.split(",").slice(2).join(",").trim()||"Uganda"}</span></article>
        </div>
      </div>
    </section>
    <section className="contact-form-section" id="contact-form">
      <div className="contact-wrap contact-form-layout">
        <aside className="contact-form-aside">
          <span className="contact-eyebrow dark">SEND A NOTE</span>
          <h2>Tell us how we can help.</h2>
          <p>Share a little about yourself and what you’d like to discuss. We’ll be glad to hear from you.</p>
          <div className="contact-aside-points"><div><span><Clock3 size={18}/></span><p><b>Thoughtful replies</b><small>We aim to respond as soon as we can.</small></p></div><div><span><HeartIcon/></span><p><b>Care at the centre</b><small>Your message helps us build a stronger circle of care around children.</small></p></div></div>
          <div className="contact-aside-verse">“Let us not love with words or speech but with actions and in truth.”<b>— 1 John 3:18</b></div>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading"><span>✦</span><div><h3>Write to our team</h3><p>Fields marked * are required.</p></div></div>
          <div className="contact-fields">
            <label>Your full name *<input name="name" autoComplete="name" placeholder="e.g. Sarah Namusoke" required/></label>
            <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label>
            <label>Phone / WhatsApp *<input name="phone" type="tel" autoComplete="tel" placeholder="+256 ..." required/></label>
            <label>Country *<input name="country" autoComplete="country-name" placeholder="Your country" required/></label>
            <label className="contact-field-wide">What would you like to discuss? *
              <select name="topic" required defaultValue=""><option value="" disabled>Select a topic</option><option>General enquiry</option><option>Donations and giving</option><option>Sponsor a child</option><option>Volunteer or visit</option><option>Partnership or collaboration</option><option>Prayer or ministry support</option><option>Media and other enquiries</option></select>
            </label>
            <label className="contact-field-wide">Your message *<textarea name="message" rows={6} minLength={10} placeholder="Tell us a little more about your question or how you would like to connect..." required/></label>
          </div>
          <button className="contact-submit" type="submit" disabled={sending}>{sending?"Sending…":"Send my message"} <Send size={17}/></button>
          <p className="contact-form-foot">Your message is sent securely to our ministry team.</p>
          {prepared&&<div className="contact-form-status" role="status"><CheckCircle2 size={18}/> Thank you! Your message has been received.</div>}{error&&<div className="contact-form-status" role="alert">{error}</div>}
        </form>
      </div>
    </section>
    <section className="contact-map-section">
      <div className="contact-wrap">
        <div className="contact-map-heading"><div><span className="contact-eyebrow dark">FIND US IN UGANDA</span><h2>Come visit our home.</h2><p>Find Papa’s Love Children’s Ministry at {details.location}.</p></div><a href="https://www.google.com/maps/search/?api=1&query=Papas+Love+Children+Ministry+Naama+Village+Mityana+Uganda" target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={16}/></a></div>
        <div className="contact-map-frame"><iframe title="Google Maps location of Papas Love Children Ministry, Naama Village, Mityana, Uganda" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7123005564213!2d31.980488169970414!3d0.4176913629570038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db5c97cb691a9%3A0x344fda4a8ab8d06d!2sPapas%20Love%20Children%20Ministry!5e0!3m2!1sen!2sug!4v1791118411200!5m2!1sen!2sug" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>
        <div className="contact-map-label"><MapPin size={18}/><span><b>Papas Love Children Ministry</b><small>{details.location}</small></span></div>
      </div>
    </section>
    <section className="contact-final-cta"><div className="contact-wrap contact-cta-inner"><span className="contact-cta-heart">♡</span><span className="contact-eyebrow">LET’S MAKE GOOD THINGS HAPPEN</span><h2>One conversation can open a door to hope.</h2><p>Join us in helping children feel safe, cared for, and ready for a brighter future.</p><div><a className="contact-cta-primary" href="/donate">Support our children <ArrowRight size={17}/></a><a className="contact-cta-secondary" href="/sponsor">Sponsor a child</a></div></div></section>
  </main>;
}
function HeartIcon(){return <MessageCircle size={18}/>}
