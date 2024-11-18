"use client";
import { Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { MandarMensagem } from "@/lib/chat";
import { Button } from "./ui/button";
import { TextShimmer } from "./motion-ui/text-shimmer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mensagem } from "@/types/mensagem.type";

export function IaAlert() {
  const [messages, setMessages] = useState<Mensagem[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localStorageKey = "iaAlertMessages";

  useEffect(() => {
    const storedMessages = localStorage.getItem(localStorageKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
      scrollToBottom();
    } else {
      setMessages([
        {
          role: "ia",
          content:
            "Olá! Eu sou o **Freire.AI**, um assistente virtual criado para te ajudar com o que precisar!",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    setMessage("");
    setLoading(true);
    const response = await MandarMensagem(message);

    const newMessages: Mensagem[] = [
      ...messages,
      { role: "user", content: message },
      { role: "ia", content: response },
    ];

    localStorage.setItem(localStorageKey, JSON.stringify(newMessages));
    setMessages(newMessages);

    setLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative w-full border p-6 rounded-xl">
      <h1 className="text-2xl font-semibold font-mono">Freire.AI</h1>
      <div className="flex flex-col w-full space-y-2 mt-5 overflow-auto max-h-96 p-5 bg-muted rounded-xl shadow-inner">
        {messages.map(
          (msg, index) =>
            (msg.role === "ia" && (
              <div key={index} className="flex space-x-2">
                <div className="rounded-xl p-2 bg-blue-600 border border-white/10 shadow-md h-fit">
                  <Sparkles size="1rem" />
                </div>
                <h1 className="text-sm border bg-muted rounded-xl border-white/10 p-2 shadow-md">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm"
                  >
                    {msg.content}
                  </ReactMarkdown>
                </h1>
              </div>
            )) ||
            (msg.role === "user" && (
              <div key={index} className="flex space-x-2 justify-end">
                <h1 className="text-sm border bg-muted rounded-xl border-white/10 p-2 shadow-md ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm"
                  >
                    {msg.content}
                  </ReactMarkdown>
                </h1>
              </div>
            ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {loading && (
        <div className="flex space-x-2 mt-5">
          <div className="rounded-lg p-2 bg-muted border border-white/10 shadow-md h-fit">
            <Sparkles size="1rem" />
          </div>
          <h1 className="text-sm border bg-muted rounded border-white/10 p-2 shadow-md">
            <TextShimmer className="font-mono text-sm mb-2">
              Carregando...
            </TextShimmer>
          </h1>
        </div>
      )}
      <div className="flex space-x-2 mt-5">
        <Input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-muted border-white/10"
          placeholder="Fale com o freire.ai"
          onKeyDown={handleKeyDown}
        />
        <Button variant={"secondary"} onClick={sendMessage}>
          Enviar
        </Button>
      </div>
    </div>
  );
}
