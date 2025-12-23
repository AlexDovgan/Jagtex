import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as xml2js from "xml2js";
import "firebase-functions/logger/compat";
/*eslint-disable*/
admin.initializeApp();
const parser = new xml2js.Parser(); 

export const importQuizXml = functions.https.onRequest(async (req, res) => {
  try {
    const xmlContent = req.body;
    
    if (!xmlContent) {
      res.status(400).send("XML content is required");
      return;
    }

    const result = await parser.parseStringPromise(xmlContent);
    console.log(result)
    if (!result?.section?.section) {
      res.status(400).send("Invalid XML format");
      return;
    }

    const db = admin.firestore();
    
    // Создаем викторину
    const quizRef = db.collection("quizzes").doc();
    const quizData = {
      title: result.section.$["data-title"] || "Тест мисливця",
      subtitle: result.section.$["data-subtitle"] || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      totalQuestions: result.section.section.length,
    };
    
    await quizRef.set(quizData);
    const quizId = quizRef.id;

    // Сохраняем каждый вопрос в коллекцию questions
    const questionsPromises = result.section.section.map(async (q: any, index: number) => {
      console.log(q)
      const answers = (q.section || []).filter((s:any)=>s.$.class=="answer").map((a: any) => {
        const text = typeof a === "string" ? a : a._ || "";
        const isCorrect = a.$?.["data-correct"] === "data-correct";
        return { text, isCorrect };
      });

      const correctAnswerIndex = answers.findIndex((a: any) => a.isCorrect);

      const questionData = {
        quizId: quizId,
        quizTitle: quizData.title,
        number: +q.$.number,
        text: q.section.find((s:any)=>s.$.class=="text")._ || "",
        answers: answers,
        correctAnswerIndex: correctAnswerIndex >= 0 ? correctAnswerIndex : null,
        description: q.section.find((s:any)=>s.$.class=="text")._  || "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Сохраняем в коллекцию questions
      const questionRef = db.collection("questions").doc();
      await questionRef.set(questionData);
      
      // Возвращаем ID для обновления викторины
      return questionRef.id;
    });

    // Ждем сохранения всех вопросов
    const questionIds = await Promise.all(questionsPromises);

    // Обновляем викторину с ID вопросов
    await quizRef.update({
      questionIds: questionIds,
      questionCount: questionIds.length,
    });

    res.status(200).json({
      success: true,
      quizId: quizId,
      totalQuestions: questionIds.length,
      questionsSaved: true,
      collection: "questions",
    });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error: ${errorMessage}`);
  }
});