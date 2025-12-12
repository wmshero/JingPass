

export interface QuestionData {
  title: string;
  description: string;
  industry: string;
  position: string;
  difficulty: string;
  time: string;
}

export interface MockQuestions {
  [key: string]: QuestionData;
}

