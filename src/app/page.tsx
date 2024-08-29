"use client"

import { Login } from "./users.actions"

export default function Home() {

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    await Login({
      name: data.get("name")
    })
  }

  return (
    <div className="w-screen flex items-center justify-center h-screen bg-slate-950">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 p-4 bg-gray-600">
        <input name="name" className="w-full px-4 py-2 rounded" type="text" placeholder="name" />
        <button className="w-full px-4 py-2 text-white bg-emerald-500 rounded" type="submit">Submit</button>
      </form>
    </div>
  );
}
