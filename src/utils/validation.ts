export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateTaskInput = (task: { text: string }): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!task.text || task.text.trim().length < 3) {
    errors.text = "Task description must be at least 3 characters long.";
  }

  if (!task.text || task.text.trim().length > 80) {
    errors.text = "Task description should not be longer than 80 characters.";
  }

  const checkCharacterRegex = /[^a-zA-Z0-9\s]/g;
  if (checkCharacterRegex.test(task.text)) {
    errors.text = "Task text contains invalid characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
