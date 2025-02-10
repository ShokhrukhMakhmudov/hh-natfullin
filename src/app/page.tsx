"use client";

import { useState, useEffect } from "react";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    token: "",
    title: "",
    description: "",
    tags: "",
    budgetFrom: "",
    budgetTo: "",
    deadline: "",
    reminds: "",
    allAutoResponses: false,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("taskFormToken");
    if (savedToken)
      setFormData((prevState) => ({ ...prevState, token: savedToken }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.token) {
      alert("Введите токен!");
      return;
    }
    localStorage.setItem("taskFormToken", formData.token);

    const url =
      `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${formData.token}` +
      `&title=${formData.title}` +
      `&description=${formData.description}` +
      `&tags=${formData.tags}` +
      `&budget_from=${formData.budgetFrom}` +
      `&budget_to=${formData.budgetTo}` +
      `&deadline=${formData.deadline}` +
      `&reminds=${formData.reminds}` +
      `&all_auto_responses=${formData.allAutoResponses}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        alert("Задача опубликована!");
      } else {
        alert("Ошибка при публикации задачи!");
      }
    } catch (error) {
      alert("Ошибка сети!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
            ? true
            : false
          : e.target.value,
    }));
  };

  return (
    <section className="">
      <h2 className="text-2xl text-center my-5">Форма заказа</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 shadow-md shadow-white rounded-lg flex flex-col gap-2">
        <input
          name="token"
          type="text"
          placeholder="Токен"
          value={formData.token}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="title"
          type="text"
          placeholder="Заголовок"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Описание"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="tags"
          type="text"
          placeholder="Теги (через запятую)"
          value={formData.tags}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="budgetFrom"
          type="number"
          placeholder="Бюджет от"
          value={formData.budgetFrom}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="budgetTo"
          type="number"
          placeholder="Бюджет до"
          value={formData.budgetTo}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="deadline"
          type="number"
          placeholder="Дедлайн (дни)"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="reminds"
          type="number"
          placeholder="Напоминания"
          value={formData.reminds}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <div className="flex items-center gap-2">
          <input
            name="allAutoResponses"
            id="allAutoResponses"
            className="checkbox"
            type="checkbox"
            checked={formData.allAutoResponses}
            onChange={handleChange}
          />
          <label htmlFor="allAutoResponses">Авто отклики</label>
        </div>
        <button type="submit" className="btn btn-md">
          Отправить
        </button>
      </form>
    </section>
  );
}
