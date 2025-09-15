#!/bin/bash

# Supabase SQL Editor 열기 스크립트
# 프로젝트의 Supabase Dashboard SQL Editor로 이동

PROJECT_REF="ytrgyuxqryzfbfnjkwqr"
SUPABASE_URL="https://supabase.com/dashboard/project/${PROJECT_REF}/sql"

echo "🚀 Supabase SQL Editor를 열고 있습니다..."
echo "📍 URL: ${SUPABASE_URL}"

# macOS에서 기본 브라우저로 열기
if command -v open &> /dev/null; then
    open "${SUPABASE_URL}"
    echo "✅ 브라우저에서 SQL Editor를 열었습니다."
else
    echo "⚠️ 'open' 명령어를 찾을 수 없습니다. 다음 URL을 수동으로 열어주세요:"
    echo "${SUPABASE_URL}"
fi

echo ""
echo "📝 실행할 SQL 파일 위치:"
echo "   $(pwd)/migrations/survey_responses_nullable_consumer_id.sql"
echo ""
echo "🔧 실행 단계:"
echo "   1. 위 URL의 SQL Editor에 접속"
echo "   2. migrations/survey_responses_nullable_consumer_id.sql 파일 내용 복사"
echo "   3. SQL Editor에 붙여넣기"
echo "   4. 'Run' 버튼 클릭하여 실행"
echo "   5. 결과 확인"