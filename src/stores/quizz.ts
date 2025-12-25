import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCollection } from "vuefire";
import { questionsRef } from "@/firebase"
import { getPassedQuestions, addPassedQuestions } from "@/utils/cookies"

const { data: questions, pending } = useCollection(questionsRef)

// Простой массив (если нужна копия)
const quiz24 = ref<any[]>([])

function getRandomInt(min: number, max: number) {
  // Ensure min and max are treated as integers for the calculation
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


watch(questions, (newQuestions: any) => {
  if (newQuestions.length > 0) {
    const cookieValue = getPassedQuestions()
    const quest24:Array<number> = []

    const nextRandom = () => {
      let res = 0;
      do {
        res = getRandomInt(0, newQuestions.length)
      } while (cookieValue.includes(res) || quest24.includes(res))
      return res;
    }
    for (let i = 0; i < 24; i++) {
      quest24.push(nextRandom())
    }
    quiz24.value =  quest24.map(i=>questions.value[i])
  }
}, { immediate: true })



export const useQuizzStore = defineStore('quizz', () => {
  let questionIndex = ref(0)
  let finished = ref(false)

  const currentQuestion = computed(() => quiz24.value?.[questionIndex.value] || undefined)
  const answers = ref<Array<any>>([]);

  const answerQuestion = (answer: Array<Number> | Number) => {
    answers.value.push(answer)
    questionIndex.value = (++questionIndex.value) % 24
    if (questionIndex.value == 0) {
      finished.value = true
      addPassedQuestions(quiz24.value.map(q=>q.number))
    }
  }

  return {
    questions: quiz24,
    pending,
    currentQuestion,
    answers,
    finished,
    questionIndex,
    answerQuestion,
  }
})
