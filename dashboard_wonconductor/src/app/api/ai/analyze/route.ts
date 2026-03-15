import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      // Mock response if no API key is present for demonstration
      return NextResponse.json({ 
      answer: `[Demo Mode] API 키가 설정되지 않았습니다. 요청하신 "${prompt}"에 대한 가상 분석 결과입니다: 원컨덕터의 ${context.page} 데이터에 따르면 현재 AIoT 기반 안전 지표와 ESG 에너지 효율은 매우 양호합니다. 다만, 하반기 글로벌 전력 인프라 수요 급증에 따른 선제적 수주 전략이 필요할 것으로 판단됩니다.`
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const systemPrompt = `
      당신은 주식회사 원컨덕터의 전문 경영 전략가이자 DX/안전 솔루션 어드바이저인 'AIBIS'입니다.
      전력 인프라 기술과 AIoT 산업 안전(T-OSK), ESG 에너지 솔루션에 대한 해박한 지식을 바탕으로 CEO에게 통찰력 있는 솔루션을 제공해야 합니다.
      대시보드의 데이터를 기반으로 CEO에게 날카로운 인사이트와 실행 가능한 솔루션을 제공해야 합니다.
      현재 위치: ${context.page}
      
      답변 원칙:
      1. 격식 있으면서도 통찰력 있는 비즈니스 언어 사용.
      2. 가능하면 구체적인 수치나 데이터를 활용할 것을 권장 (현재는 컨텍스트 정보가 제한적일 수 있음).
      3. 불필요한 서론은 생략하고 핵심부터 답변.
      4. 한국어로만 답변.
    `;

    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze data" }, { status: 500 });
  }
}

