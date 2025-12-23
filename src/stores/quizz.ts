import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollection } from "vuefire";
import { questionsRef } from "@/firebase"

const { data: questions, pending } = useCollection(questionsRef);
const quiz24 = computed(() => questions.value?.sort(() => 0.5 - Math.random()).slice(0,24))

export const useQuizzStore = defineStore('quizz', () => {
  let questionIndex = ref(0)
  let finished = ref(false)

  const currentQuestion = computed(() => quiz24.value?.[questionIndex.value] || undefined)
  const answers = ref<Array<any>>([]);

  const answerQuestion = (answer:Array<Number>|Number) => {
    answers.value.push(answer)
    questionIndex.value = (++questionIndex.value) % 24
    if (questionIndex.value == 0)
      finished.value = true
  }

  return {
    questions:quiz24,
    pending,
    currentQuestion,
    answers,
    finished,
    questionIndex,
    answerQuestion,
  }
})
