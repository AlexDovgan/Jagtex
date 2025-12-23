<template>
    <div>
        <div>Питання №{{ questionNumber }}</div>
        
        <div>{{ question?.text }}</div>
        <div>
            <div v-for="a,i in question?.answers" :key="a.number">
                <input 
                :type="inputType" 
                :value="i" v-model="selectedAnswers"
                name = "quizz"
                 /> {{ a.text }}
            </div>
        </div>
        <button :disabled="selectedAnswers==null" @click="handleAnswer">Далі</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed,watch } from "vue";
const props = defineProps({
    question: Object,
    questionNumber:Number
})
const emit = defineEmits<{
    answer: [question: Array<Number> | Number]
}>()

const inputType = computed(() => props.question?.answers.filter((a:any)=> a.isCorrect) > 1 ? "checkbox" : "radio")
const selectedAnswers = ref(inputType.value === 'checkbox' ? [] : null)
 
 
const handleAnswer = () => {
    emit('answer', selectedAnswers.value!)
}
</script>



<style scoped></style>
