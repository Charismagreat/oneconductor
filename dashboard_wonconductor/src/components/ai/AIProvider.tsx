"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  addMessage: (role: 'user' | 'ai', content: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: '안녕하세요, CEO님. 주식회사 원컨덕터의 전략 비즈니스 파트너 AIBIS입니다. 오늘 어떤 데이터를 분석해 드릴까요?',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (role: 'user' | 'ai', content: string) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  return (
    <AIContext.Provider value={{ isOpen, setIsOpen, messages, addMessage, isLoading, setIsLoading }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
