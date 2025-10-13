export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="font-semibold">Tom Brown</h3>
          <p className="mt-2 text-sm text-neutral-600">Nutritious roasted cereal. Freshly packed in Ghana.</p>
        </div>
        <div>
          <h4 className="font-medium">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Social</h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            <li>WhatsApp: +233 240272928</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Tom Brown
      </div>
    </footer>
  )
}
