'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { ArrowUp, Send, Sparkles, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'bot'
  messages: string
  time: string
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function parseReply(raw: string): string {
  if (!raw) return 'Sorry, no response.'
  const trimmed = raw.trim()

  // Strip markdown code fences  ```json … ```  or  ``` … ```
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i)
  const inner = fenceMatch ? fenceMatch[1].trim() : trimmed

  // Try JSON and extract common reply fields
  try {
    const parsed = JSON.parse(inner)
    if (typeof parsed === 'string') return parsed
    return (
      parsed.message ??
      parsed.reply ??
      parsed.content ??
      parsed.text ??
      parsed.answer ??
      JSON.stringify(parsed, null, 2)
    )
  } catch {
    return inner
  }
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const APP_ID = usePathname().split('/').pop()

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 60)
    return () => clearTimeout(timer)
  }, [messages, isLoading])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/app/${APP_ID}/chat`)
        setMessages(res.data.chats ?? [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchMessages()
  }, [APP_ID])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      messages: text,
      time: getTime(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    try {
      const res = await axios.post(
        `/api/apps/${APP_ID}/chat`,
        { message: text },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const data = res.data
      const rawReply: string = data.message ?? data.reply ?? data.content ?? data.text ?? ''
      const reply = parseReply(rawReply || JSON.stringify(data))

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'bot', messages: reply, time: getTime() },
      ])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          messages: 'Something went wrong. Please try again.',
          time: getTime(),
        },
      ])
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    /*
     * The TopNav is `fixed` with h-14 (56px).
     * The sidebar layout likely adds a left offset, but vertical space must be
     * manually reserved with pt-14 on the outer wrapper.
     *
     * Structure:
     *   [fixed navbar — 56px]
     *   [this div — fills remaining viewport height below navbar]
     *     [scrollable messages — grows and scrolls]
     *     [input bar — always pinned at the bottom, never scrolls away]
     */
    <div
      className="flex flex-col bg-zinc-50 h-[calc(100vh-3.5rem)] overflow-hidden no-scrollbar"
    >
      {/* ── Scrollable message list ── */}
      <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              style={{ animation: 'fadeUp 0.2s ease forwards', opacity: 0 }}
            >
              

              {/* Bubble + timestamp */}
              <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 text-sm leading-relaxed tracking-tight break-words whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-violet-500 text-white rounded-2xl rounded-br-[4px]'
                      : 'bg-white text-zinc-800 border border-zinc-200 rounded-2xl rounded-tl-[4px] shadow-sm'
                  }`}
                >
                  {msg.messages}
                </div>
                <p className="text-[10.5px] text-zinc-400 font-mono px-0.5">{msg.time}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div
              className="flex gap-2.5"
              style={{ animation: 'fadeUp 0.2s ease forwards', opacity: 0 }}
            >
              <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-violet-600 text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-[4px] shadow-sm px-4 py-3.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-px" />
        </div>
      </div>

      {/* ── Input bar — always visible at the bottom ── */}
      <div className="flex-shrink-0 bg-white border-t border-zinc-200 px-4 sm:px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-[3px] focus-within:ring-blue-500/10 transition-all duration-150">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                autoResize()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-zinc-800 placeholder:text-zinc-400 leading-relaxed max-h-[120px] py-0.5 font-sans"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 bg-gray-600 text-white hover:bg-gray-900 cursor-pointer active:scale-95 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
            >
              <ArrowUp className="" />
            </button>
          </div>
          <p className="text-center text-[10.5px] text-zinc-400 font-mono mt-2 tracking-wide">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}