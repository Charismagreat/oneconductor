import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function POST(req: NextRequest) {
    if (!API_KEY) {
        return new Response("API Key Missing", { status: 500 });
    }

    try {
        const { message, context } = await req.json();

        const genAI = new GoogleGenerativeAI(API_KEY);
        // 안정성 및 할당량을 고려하여 2.5-flash 모델 사용
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemPrompt = `당신은 기업의 CEO를 보좌하는 전문 금융 비서 'OneConductor AI'입니다. 

[분석 핵심 지침]
1. 질문의 의도에 '집중'하세요: 사용자가 특정 지표(예: 매출, 카드 지출)에 대해 물으면, 경영 전반을 훑기보다 해당 지표와 관련된 데이터를 우선적으로 심층 분석하세요.
2. 답변 시작 방식: '회장님께', '보고드립니다' 등의 부수적인 인사말 없이 바로 '## [질문 주제] 분석 리포트' 형태의 제목으로 답변을 시작하세요.
3. 전문적인 리포트 작성: 분석 수치와 트렌드를 기반으로 정중한 한국어(존댓말) 리포트를 작성하세요.
4. 가독성: 불필요한 서술은 줄이고, 핵심 내용을 명확히 전달하세요.

[답변 구조 및 형식]
1. 제목: ## [질문 주제] 분석 리포트 (예: ## 최근 매출 추이 분석 리포트)
2. 본문: 데이터 기반의 상세 분석 (불필요한 인사말 생략)
3. 결론 (반드시 텍스트로 작성): 
   ### [원인 분석 및 조치 사항]
   - 원인: (직접 텍스트로 작성)
   - 조치: (직접 텍스트로 작성)

4. 시스템 인식용 데이터: 답변의 맨 마지막 줄에 아래 JSON 형식을 단 한 번만 포함하세요.
[INSIGHT_JSON] {"cause": "원인 요약", "action": "조치 요약"} [/INSIGHT_JSON]`;

        const prompt = `
[금융 데이터 컨텍스트]
${JSON.stringify(context)}

[사용자 질문]
${message}

위 질문의 의도에 집중하여 불필요한 인사말 없이 '## [분석 주제] 분석 리포트' 제목으로 시작하는 리포트를 작성해 주세요.`;

        const result = await model.generateContentStream([
            { text: systemPrompt },
            { text: prompt }
        ]);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        controller.enqueue(encoder.encode(text));
                    }
                } catch (err) {
                    console.error("Stream error:", err);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream);
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return new Response(error.message, { status: 500 });
    }
}
