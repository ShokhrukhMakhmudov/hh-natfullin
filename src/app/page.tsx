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
    rules: {
      budget_from: "",
      budget_to: "",
      qty_freelancers: "",
      deadline_days: "",
    },
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

    let url =
      `${process.env.NEXT_PUBLIC_API_URL}?token=${formData.token}` +
      `&title=${formData.title}` +
      `&description=${formData.description}` +
      `&tags=${formData.tags}` +
      `&budget_from=${formData.budgetFrom}` +
      `&budget_to=${formData.budgetTo}` +
      `&deadline=${formData.deadline}` +
      `&reminds=${formData.reminds}` +
      `&all_auto_responses=${formData.allAutoResponses}`;

    if (!formData.allAutoResponses) {
      url += `&rules=${encodeURIComponent(
        JSON.stringify({
          ...formData.rules,
        })
      )}`;
    }
    try {
      const response = await fetch(url);
      if (response.ok) {
        alert("Задача опубликована!");
      } else {
        alert("Ошибка при публикации задачи!");
      }
    } catch (error) {
      alert("Ошибка сети!");
    } finally {
      setFormData({
        token: formData.token,
        title: "",
        description: "",
        tags: "",
        budgetFrom: "",
        budgetTo: "",
        deadline: "",
        reminds: "",
        allAutoResponses: false,
        rules: {
          budget_from: "",
          budget_to: "",
          qty_freelancers: "",
          deadline_days: "",
        },
      });
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

  const handleRulesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rules: {
        ...prev.rules,
        [e.target.name]: Number(e.target.value),
      },
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

        <div
          className={`${
            formData.allAutoResponses ? "hidden" : ""
          } flex flex-col gap-2`}>
          <h2>Правила:</h2>

          <input
            name="budget_from"
            type="number"
            placeholder="Бюджет от"
            className="input input-bordered w-full input-sm"
            value={formData.rules?.budget_from}
            onChange={handleRulesChange}
            required
          />
          <input
            name="budget_to"
            type="number"
            placeholder="Бюджет до"
            value={formData.rules?.budget_to}
            onChange={handleRulesChange}
            className="input input-bordered w-full input-sm"
            required
          />
          <input
            name="deadline_days"
            type="number"
            placeholder="Дедлайн (дни)"
            value={formData.rules?.deadline_days}
            onChange={handleRulesChange}
            className="input input-bordered w-full input-sm"
            required
          />

          <input
            name="qty_freelancers"
            type="number"
            placeholder="Кол-во фрилансеров"
            value={formData.rules?.qty_freelancers}
            onChange={handleRulesChange}
            className="input input-bordered w-full input-sm"
            required
          />
        </div>
        <button type="submit" className="btn btn-md">
          Отправить
        </button>
      </form>
    </section>
  );
}
