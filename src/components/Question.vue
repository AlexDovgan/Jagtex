<template>
    <v-card>
        <v-card-title>{{ question?.text }}</v-card-title>

        <v-card-subtitle>Питання №{{ questionNumber }}</v-card-subtitle>

        <v-card-text class="bg-surface-light pt-4">
            <v-radio-group v-model="selectedAnswers">
                <v-radio v-for="a, i in question?.answers" :key="a.number" :value="i" :label="a.text"/>
                    
             </v-radio-group>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="selectedAnswers == null" @click="handleAnswer">Далі</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
const props = defineProps({
    question: Object,
    questionNumber: Number
})
const emit = defineEmits<{
    answer: [question: Array<Number> | Number]
}>()

const inputType = computed(() => props.question?.answers.filter((a: any) => a.isCorrect) > 1 ? "checkbox" : "radio")
const selectedAnswers = ref(inputType.value === 'checkbox' ? [] : null)


const handleAnswer = () => {
    emit('answer', selectedAnswers.value!)
}
</script>



<style scoped></style>
