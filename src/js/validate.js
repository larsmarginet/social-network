{
  const handleSubmitForm = e => {
    const $form = e.currentTarget;
    if (!$form.checkValidity()) {
      e.preventDefault();

      const fields = $form.querySelectorAll(`.valid-input`);
      fields.forEach(showValidationInfo);
    }
  };

  const showValidationInfo = $field => {
    let message;
    if ($field.validity.valueMissing) {
      message = `Verplicht`;
    }
    if ($field.validity.typeMismatch) {
      message = `Type niet juist`;
    }
    if ($field.validity.rangeOverflow) {
      const max = $field.getAttribute(`max`);
      message = `Te groot max ${max}`;
    }
    if ($field.validity.rangeUnderflow) {
      const min = $field.getAttribute(`min`);
      message = `Te klein, min ${min}`;
    }
    if ($field.validity.tooShort) {
      message = `Te kort`;
    }
    if ($field.validity.tooLong) {
      message = `Te lang`;
    }
    if (message) {
      $field.parentElement.querySelector(`.form-error`).textContent = message;
      $field.style.borderColor = 'red';
    }
  };

  const handeInputField = e => {
    const $field = e.currentTarget;
    if ($field.checkValidity()) {
      $field.parentElement.querySelector(`.form-error`).textContent = ``;
      $field.style.borderColor = '#73CBB5';
      if ($field.form.checkValidity()) {
        $field.form.querySelector(`.form-error`).innerHTML = ``;
        $field.style.borderColor = '#73CBB5';
      }
    }
  };

  const handeBlurField = e => {
    const $field = e.currentTarget;
    showValidationInfo($field);
  };

  const addValidationListeners = fields => {
    fields.forEach($field => {
      $field.addEventListener(`input`, handeInputField);
      $field.addEventListener(`blur`, handeBlurField);
    });
  };

  const init = () => {
    const $form = document.querySelectorAll(`form`);
    console.log($form);
    $form.forEach(form => {
      form.noValidate = true;
      form.addEventListener(`submit`, handleSubmitForm);

      const fields = form.querySelectorAll(`.valid-input`);
      addValidationListeners(fields);
    });
  };

  init();
}
