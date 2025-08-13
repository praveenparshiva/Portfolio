import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear any existing messages when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name.' });
      return false;
    }
    if (!form.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address.' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return false;
    }
    if (!form.message.trim()) {
      setMessage({ type: 'error', text: 'Please enter your message.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    // Check if EmailJS is properly configured
    if (!import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || 
        !import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY) {
      setMessage({ 
        type: 'error', 
        text: 'Email service is not properly configured. Please contact the site administrator.' 
      });
      return;
    }

    setLoading(true);
    setEmailStatus('sending');
    setMessage({ type: '', text: '' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Success state
      setEmailStatus('success');
      setMessage({ 
        type: 'success', 
        text: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
      });
      
      // Reset form after successful submission
      setForm({ name: "", email: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
        setEmailStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("EmailJS Error:", error);
      
      // Error state
      setEmailStatus('error');
      let errorMsg = 'Failed to send message. ';
      
      if (error.status === 0) {
        errorMsg += 'Please check your internet connection.';
      } else if (error.text) {
        errorMsg += error.text;
      } else {
        errorMsg += 'Please try again later or contact me directly.';
      }
      
      setMessage({ type: 'error', text: errorMsg });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
        setEmailStatus('idle');
      }, 5000);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch With Me"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                {message.text && (
                  <div className={`p-3 rounded-lg text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {message.text}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading || emailStatus === 'sending'}
                  className={`transition-all duration-300 ${
                    loading || emailStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {emailStatus === 'sending' ? "Sending..." : 
                       emailStatus === 'success' ? "Message Sent!" : 
                       emailStatus === 'error' ? "Try Again" : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
