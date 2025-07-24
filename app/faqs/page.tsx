
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FaQsService, FAQResponse, FAQCreate, FAQUpdate } from "@/lib/api";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface EditingFAQ extends FAQResponse {
  id?: number;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingFaq, setEditingFaq] = useState<EditingFAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await FaQsService.listFaqsFaqsGet();
      setFaqs(response);
    } catch (err) {
      setError("Не удалось загрузить часто задаваемые вопросы.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleCreate = async () => {
    if (!editingFaq || !adminPassword) {
      setError("Все поля и пароль администратора обязательны для создания часто задаваемого вопроса.");
      return;
    }
    
    try {
      const faqData: FAQCreate = {
        question: editingFaq.question,
        answer: editingFaq.answer,
      };
      
      await FaQsService.createFaqFaqsPost(adminPassword, faqData);
      await fetchFaqs();
      setIsCreating(false);
      setEditingFaq(null);
    } catch (err) {
      setError("Не удалось создать часто задаваемый вопрос.");
      console.error(err);
    }
  };

  const handleUpdate = async (faqId: number) => {
    if (!editingFaq || !adminPassword) {
      setError("Все поля и пароль администратора обязательны для обновления часто задаваемого вопроса.");
      return;
    }
    
    try {
      const faqData: FAQUpdate = {
        question: editingFaq.question,
        answer: editingFaq.answer,
      };
      
      await FaQsService.updateFaqFaqsIdPut(faqId, adminPassword, faqData);
      await fetchFaqs();
      setEditingFaq(null);
    } catch (err) {
      setError("Не удалось обновить часто задаваемый вопрос.");
      console.error(err);
    }
  };

  const handleDelete = async (faqId: number) => {
    if (!adminPassword) {
      setError("Требуется пароль администратора для удаления.");
      return;
    }
    
    if (!confirm("Вы уверены, что хотите удалить этот часто задаваемый вопрос?")) return;
    
    try {
      await FaQsService.deleteFaqFaqsIdDelete(faqId, adminPassword);
      await fetchFaqs();
    } catch (err) {
      setError("Не удалось удалить часто задаваемый вопрос.");
      console.error(err);
    }
  };

  const startCreating = () => {
    setEditingFaq({
      question: "",
      answer: "",
      id: 0,
      created_at: "",
      updated_at: "",
    });
    setIsCreating(true);
  };

  const startEditing = (faq: FAQResponse) => {
    setEditingFaq({ ...faq });
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingFaq(null);
    setIsCreating(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Управление часто задаваемыми вопросами</CardTitle>
              <CardDescription>
                Управляйте часто задаваемыми вопросами и ответами на них.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  type="password"
                  placeholder="Пароль администратора"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-64"
                />
                <Button onClick={startCreating} disabled={isCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить вопрос
                </Button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {loading ? (
                <p>Загрузка часто задаваемых вопросов...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Вопрос</TableHead>
                      <TableHead>Ответ</TableHead>
                      <TableHead>Создано</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isCreating && (
                      <TableRow>
                        <TableCell>
                          <Input
                            value={editingFaq?.question || ""}
                            onChange={(e) => setEditingFaq(prev => prev ? {...prev, question: e.target.value} : null)}
                            placeholder="Вопрос"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingFaq?.answer || ""}
                            onChange={(e) => setEditingFaq(prev => prev ? {...prev, answer: e.target.value} : null)}
                            placeholder="Ответ"
                          />
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleCreate}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditing}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="max-w-xs">
                          {editingFaq && editingFaq.id === faq.id && !isCreating ? (
                            <Input
                              value={editingFaq.question}
                              onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                            />
                          ) : (
                            <div className="truncate" title={faq.question}>
                              {faq.question}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md">
                          {editingFaq && editingFaq.id === faq.id && !isCreating ? (
                            <Input
                              value={editingFaq.answer}
                              onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                            />
                          ) : (
                            <div className="truncate" title={faq.answer}>
                              {faq.answer}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(faq.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {editingFaq && editingFaq.id === faq.id && !isCreating ? (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleUpdate(faq.id)}>
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => startEditing(faq)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
