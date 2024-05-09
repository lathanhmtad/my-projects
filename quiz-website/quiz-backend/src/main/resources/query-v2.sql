USE quiz;

# select câu trả lời của người dùng có id 4 cho bài quiz số 2(chính trị)
SELECT  ques.description as question, ans.description as answer, pa.answer_id, ans.correct_answer, pa.user_answer
FROM quiz AS q
JOIN question AS ques ON q.id = ques.quiz_id
JOIN answer AS ans ON ques.id = ans.question_id
JOIN participant_answer AS pa ON ans.id = pa.answer_id
WHERE pa.participant_id = 4 and q.id = 2;

select ans.correct_answer
from answer as ans
JOIN question AS ques ON ques.id = ans.question_id
JOIN participant_answer AS par ON par.question_id = ques.id
where ans.description = 'Abraham Lincoln' and ques.id = 11;

select par.user_answer
from participant_answer AS par
JOIN question AS ques ON ques.id = par.question_id
JOIN answer AS ans ON ques.id = ans.question_id
where participant_id=4 and ques.quiz_id=2 and par.user_answer = ans.description and ans.correct_answer = 1



