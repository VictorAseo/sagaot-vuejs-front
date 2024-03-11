import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import type { TaskProps } from "@/@types/views/Task";
import type { RegisterActivitiesFieldsProps } from "@/@types/stores/RegisterActivitiesStore";

export const useRegisterActivitiesStore = defineStore("registerActivitiesStore", () => {
  const showActivities = ref(true);
  const showForm = ref(false);
  const selectedActivity = ref({} as TaskProps);
  const selectedModule: Ref<number | null> = ref(null);
  const isGettingData = ref(false);

  const fields: Ref<RegisterActivitiesFieldsProps> = ref({
    type: 0,
    name: {
      label: "Nome da atividade",
      value: "",
      type: "text",
      placeholder: "Digite aqui"
    },
    exp: {
      label: "Quantidade de exp",
      value: 1,
      type: "number",
      placeholder: "Digite aqui"
    },
    content: {
      label: "Conteúdo da atividade",
      value: "",
      type: "text",
      placeholder: "Digite aqui"
    },
    answers: [],
    correctAnswerIndex: 0
  });

  const checkRequiredField = (validations: any, key: string) => {
    const status = !!fields.value[key].value;
    validations[key].valid = status;
    validations[key].feedback = status ? "" : "Campo obrigatório";

    return status;
  };

  const validations = ref({
    type: {
      valid: true,
      feedback: "",
      validation: () => fields.value.type !== null
    },
    name: {
      valid: true,
      feedback: "",
      validation: () => checkRequiredField(validations.value, "name")
    },
    exp: {
      valid: true,
      feedback: "",
      validation: () => {
        const isValid = fields.value.exp.value > 0;
        validations.value.exp.valid = isValid;
        validations.value.exp.feedback = isValid ? "" : "Campo obrigatório";

        return isValid;
      }
    },
    content: {
      valid: true,
      feedback: "",
      validation: () => {
        const isFilled = checkRequiredField(validations.value, "content");

        if (fields.value.type !== 1 || !isFilled) return isFilled;

        const quantityVariables = fields.value.content.value
          .split(" ")
          .filter((value) => value?.includes("$variavel")).length;

        validations.value.content.valid = !!quantityVariables;
        validations.value.content.feedback = quantityVariables
          ? ""
          : "Não possui ao menos 1 variável";

        return !!quantityVariables;
      }
    },
    answers: {
      valid: true,
      feedback: "",
      validation: () => {
        if (!fields.value.answers.length) {
          validations.value.answers.valid = false;
          return false;
        }

        fields.value.answers.forEach((answer, i) => {
          const isFilled = !!answer.value;
          fields.value.answers[i].valid = isFilled;
          fields.value.answers[i].feedback = isFilled ? "" : "Campo obrigatório";

          if (!isFilled) return;

          if (fields.value.type === 1) {
            const quantityVariables = fields.value.content.value
              .split(" ")
              .filter((value) => value?.includes("$variavel")).length;
            const quantityWords = !answer.value ? 0 : answer.value.split(",").length;
            fields.value.answers[i].valid = quantityWords === quantityVariables;
            fields.value.answers[i].feedback =
              quantityWords === quantityVariables
                ? ""
                : "A Quantidade de variáveis não corresponde";
          }
        });

        const answersValidationsList = fields.value.answers.map(answer => answer.valid);
        const isValid = !answersValidationsList.includes(false);
        validations.value.answers.feedback =
          !isValid && fields.value.type === 2 ? "Campo obrigatório" : "";
        validations.value.answers.valid = isValid;

        return isValid;
      }
    },
    correctAnswerIndex: {
      valid: true,
      feedback: "",
      validation: () => fields.value.correctAnswerIndex !== null
    }
  });

  const $resetRegisterActivities = () => {
    showActivities.value = true;
    showForm.value = false;
    selectedActivity.value = {} as TaskProps;

    fields.value = {
      type: 0,
      name: {
        ...fields.value.name,
        value: ""
      },
      exp: {
        ...fields.value.exp,
        value: 1
      },
      content: {
        ...fields.value.content,
        value: ""
      },
      answers: [],
      correctAnswerIndex: 0
    };

    validations.value = {
      type: {
        valid: true,
        feedback: "",
        validation: () => fields.value.type !== null
      },
      name: {
        ...validations.value.name,
        valid: true,
        feedback: ""
      },
      exp: {
        ...validations.value.exp,
        valid: true,
        feedback: ""
      },
      content: {
        ...validations.value.content,
        valid: true,
        feedback: ""
      },
      answers: {
        ...validations.value.answers,
        valid: true,
        feedback: ""
      },
      correctAnswerIndex: {
        ...validations.value.correctAnswerIndex,
        valid: true,
        feedback: ""
      }
    };
  };

  const cleanContentAndAnswers = () => {
    fields.value = {
      ...fields.value,
      content: {
        ...fields.value.content,
        value: ""
      },
      answers:
        fields.value.type !== 2
          ? [
              {
                value: "",
                type: "text",
                placeholder: "Digite aqui",
                valid: true,
                feedback: ""
              },
              {
                value: "",
                type: "text",
                placeholder: "Digite aqui",
                valid: true,
                feedback: ""
              }
            ]
          : [],
      correctAnswerIndex: 0
    };

    validations.value = {
      ...validations.value,
      content: {
        ...validations.value.content,
        valid: true,
        feedback: ""
      },
      answers: {
        ...validations.value.answers,
        valid: true,
        feedback: ""
      },
      correctAnswerIndex: {
        ...validations.value.correctAnswerIndex,
        valid: true,
        feedback: ""
      }
    };
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterActivities();

    showActivities.value = card === "modules";
    showForm.value = card === "form";
  };

  return {
    fields,
    validations,
    showActivities,
    showForm,
    selectedActivity,
    selectedModule,
    isGettingData,
    handleShow,
    cleanContentAndAnswers,
    $resetRegisterActivities
  };
});
