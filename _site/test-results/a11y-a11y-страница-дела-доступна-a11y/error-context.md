# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.js >> a11y: страница дела доступна
- Location: tests\a11y.spec.js:14:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 49

- Array []
+ Array [
+   Object {
+     "description": "Ensure <dl> elements are structured correctly",
+     "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/definition-list?application=playwright",
+     "id": "definition-list",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   dl element has direct children that are not allowed: div > small",
+         "html": "<dl class=\"doc-meta\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "values": "div > small",
+             },
+             "id": "only-dlitems",
+             "impact": "serious",
+             "message": "dl element has direct children that are not allowed: div > small",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<small class=\"age-note\">Маркировка носит рекомендательный характер и не является условием участия. Подробная карта тем игры — в блоке «фокус и вуали» ниже.</small>",
+                 "target": Array [
+                   ".age-note",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "dl",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.structure",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.3",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "На главную" [ref=e3] [cursor=pointer]:
      - /url: "#/"
      - generic [ref=e4]: V
      - generic [ref=e5]:
        - strong [ref=e6]: VIREIST
        - text: досье мастера
    - navigation [ref=e7]:
      - link "Игры" [ref=e8] [cursor=pointer]:
        - /url: "#/"
      - link "Наборы" [ref=e9] [cursor=pointer]:
        - /url: "#/"
      - link "По запросу" [ref=e10] [cursor=pointer]:
        - /url: "#/"
      - link "Обо мне" [ref=e11] [cursor=pointer]:
        - /url: "#/"
      - link "Стол" [ref=e12] [cursor=pointer]:
        - /url: "#/"
      - link "Отзывы" [ref=e13] [cursor=pointer]:
        - /url: "#/"
      - link "FAQ" [ref=e14] [cursor=pointer]:
        - /url: "#/"
      - link "Контакты" [ref=e15] [cursor=pointer]:
        - /url: "#/"
    - button "Переключить тему" [ref=e17] [cursor=pointer]: ☀
  - main [ref=e18]:
    - text: Примечание о стоимости по запросу /// /// + + + + + + + + + + + +
    - generic [ref=e20]:
      - link "← В картотеку" [ref=e21] [cursor=pointer]:
        - /url: "#/"
      - generic [ref=e22]:
        - generic [ref=e23]: Дело № 001
        - generic [ref=e24]: платно
      - heading "И мир оделся в красоту" [level=2] [ref=e25]
      - paragraph [ref=e26]: «Мы сохранили человечество от монстров. Теперь позвольте им умереть как людям» — эти слова прозвучали по всем каналам, и мир послушно начал прощаться. Но вы остались в пустом комплексе, потому что для вас «спасти» никогда не значило «отпустить».
      - generic [ref=e28]:
        - generic [ref=e29]:
          - term [ref=e30]: Система
          - definition [ref=e31]: Irreality
        - generic [ref=e32]:
          - term [ref=e33]: Вселенная
          - definition [ref=e34]: SCP Foundation
        - generic [ref=e35]:
          - term [ref=e36]: Формат
          - definition [ref=e37]: трипл-шот
        - generic [ref=e38]:
          - term [ref=e39]: Игроки
          - definition [ref=e40]: 1-3 игроков
        - generic [ref=e41]:
          - term [ref=e42]: Длительность
          - definition [ref=e43]: 2-4 сессии
        - generic [ref=e44]:
          - term [ref=e45]: Стоимость
          - definition [ref=e46]: платно
        - generic [ref=e47]:
          - term [ref=e48]: Возрастная маркировка
          - definition [ref=e49]: 18+
          - generic [ref=e50]: Маркировка носит рекомендательный характер и не является условием участия. Подробная карта тем игры — в блоке «фокус и вуали» ниже.
      - generic [ref=e51]:
        - generic [ref=e52]: /// подготовка персонажа
        - paragraph [ref=e53]:
          - strong [ref=e54]: "Предыстория:"
          - text: С крючками
        - paragraph [ref=e55]: Укажите 1-2 важных момента прошлого — они могут вернуться в игре
      - generic [ref=e56]:
        - heading "Описание" [level=3] [ref=e57]
        - paragraph [ref=e58]: Игра основана на вселенной SCP Foundation. Принимаю всех, даже тех кто не знаком с лором!
        - paragraph [ref=e59]: Перед началом игры, будет отправлен документ с краткой лорной справкой, так что все смогут втянуться и поиграть.
        - heading "Завязка" [level=3] [ref=e60]
        - paragraph [ref=e61]: "Невидимый и вездесущий, Фонд SCP всегда существовал вне пределов чьей-либо юрисдикции. Наделенный соответствующими полномочиями всех основных мировых правительств, он нес на себе одну, предельно тяжелую ношу: сдерживание объектов и явлений, которые ставят под угрозу естественность и нормальность этого мира. Десятилетиями Фонд был щитом. Щитом, который бился о тьму так долго, что его сотрудники забыли, как выглядит мир без аномалий. Мы хранили человечество от монстров."
        - paragraph [ref=e62]: Но сегодня монстры отступили сами.
        - paragraph [ref=e63]: "Ваш обычный ужин в столовой комплекса. Стук приборов, тихий гул голосов. Вы сидите за своим столиком: кто-то доедает суп, кто-то листает планшет с отчетами, кто-то просто смотрит в пустоту, пытаясь забыть прошедшую смену. Рутина. Эта спасительная рутина, которая всегда была лучшей защитой от безумия."
        - paragraph [ref=e64]: Экраны в столовой моргают. Трансляция внутренних новостей обрывается, сменяясь статичным гербом Фонда. Затем раздается голос. Не громкий, не требовательный. Тихий, почти усталый и бесконечно меланхоличный голос Администратора.
        - paragraph [ref=e65]: Теперь мир узнал правду. Не через крики сирен или панику ― через это обращение. Маскарад пал. Больше нет нужды скрываться.
        - paragraph [ref=e66]: За толстыми бетонными стенами Комплекса сейчас Земля прекрасна, как никогда. Повсюду расцвели яркие, невиданные ранее цветы. Воздух стал густым, сладким, особенным. На поверхности люди обнимаются на улицах, плачут, смеются сквозь слёзы. Никто не грабит магазины. Никто не воюет. Все просто... прощаются.
        - paragraph [ref=e67]: 24 часа до того, как последний человек закроет глаза. Навсегда.
        - paragraph [ref=e68]: "Фонд выполнил свой долг. Освободил тех, кто не опасен. Отправил сотрудников в отпуск ― бессмысленно, но по-человечески. Администратор сказал: «Мы сохранили человечество от монстров. Теперь позвольте им умереть как людям»."
        - paragraph [ref=e69]: Но вы остаётесь. Наверное, есть вещи, которые вы не можете просто так оставить.
        - heading "Ваша задача" [level=4] [ref=e70]
        - paragraph [ref=e71]:
          - text: Найти способ отменить то, что уже началось. Или хотя бы понять ― почему мир должен умереть именно так?
          - emphasis [ref=e72]: Красиво. Тихо. С цветами.
      - generic [ref=e73]:
        - generic [ref=e74]: /// фокус и вуали
        - paragraph [ref=e75]: Это карта этой игры. Она покажет, что исследует подробно и что остаётся на краю кадра. По ней легко заранее понять, ваша это история или нет.
        - generic [ref=e76]:
          - generic [ref=e77]:
            - heading "Фокус" [level=4] [ref=e78]
            - generic [ref=e79]: база игры — может всплыть подробно
            - list [ref=e80]:
              - listitem [ref=e81]: — насилие и кровавые сцены (столкновение с аномалиями и боевые эпизоды)
              - listitem [ref=e82]: — темы массовой гибели
              - listitem [ref=e83]: — экзистенциальный кризис
              - listitem [ref=e84]: — моральные дилеммы
              - listitem [ref=e85]: — элементы боди-хоррора
          - generic [ref=e86]:
            - heading "Вуали" [level=4] [ref=e87]
            - generic [ref=e88]: вряд ли всплывёт, либо вскользь
            - list [ref=e89]:
              - listitem [ref=e90]: — самоубийства
              - listitem [ref=e91]: — гибель детей
              - listitem [ref=e92]: — пытки и жестокость
              - listitem [ref=e93]: — гибель значимых НПС
              - listitem [ref=e94]: — горе и потери близких
              - listitem [ref=e95]: — зависимости как способ держаться
              - listitem [ref=e96]: — фанатизм и культы
        - generic [ref=e97]: Это карта игры, а не контракт. Если что-то чувствительно для вас — напишите до игры, обсудим. Механика «стоп» (X-card) работает в любом случае.
      - generic [ref=e98]:
        - heading "/// показания по делу" [level=3] [ref=e99]
        - figure "Mister Y «И мир оделся в красоту»" [ref=e101]:
          - paragraph [ref=e102]: Фанатам темы SCP и даже тем, кто не касался этой темы, будет интересно окунуться в столь прекрасный мир, полный тайн и событий. Одни будут рады столкнуться с знакомыми объектами (а может и новыми для них), другие же смогут исследовать, попасть в новые и необычные для них ситуации и места, найти своё решение, даже не зная насколько оно было правильным.
          - paragraph [ref=e103]: Мне нравится повествование, описание столь знакомых локаций, эмбиент, игравший всё прохождение. Он очень подходил под самые разные ситуации. Особенно понравилось проработка и взаимодействие с окружающим миром. Простая [данные удалены], на которую даже не обращаешь внимания, смогла спасти моему персонажу жизнь. Простое взаимодействие с правильным предметом в правильной ситуации может привести к очень необычным исходам.
          - generic [ref=e104]:
            - generic [ref=e105]: Mister Y
            - generic [ref=e106]: «И мир оделся в красоту»
      - generic [ref=e107]:
        - link "Записаться на игру" [ref=e108] [cursor=pointer]:
          - /url: "#/"
        - link "Все дела" [ref=e109] [cursor=pointer]:
          - /url: "#/"
  - contentinfo [ref=e110]:
    - generic [ref=e111]:
      - paragraph [ref=e112]: "Возрастная маркировка материалов сайта: 18+"
      - paragraph [ref=e113]:
        - text: "Нашли опечатку или баг на сайте — напишите мне:"
        - link "@vireist" [ref=e114] [cursor=pointer]:
          - /url: https://t.me/vireist
      - paragraph [ref=e115]: "Фан-материалы: часть игр основана на фанатских вселенных и интернет-фольклоре. Такие материалы неофициальны, принадлежат их авторам и сообществам и используются без коммерческой эксплуатации самих вселенных."
      - paragraph [ref=e116]: "Материалы публикуются под лицензией CC BY-NC-SA 4.0: делитесь и адаптируйте для своих игр с указанием автора, без коммерческого использования."
      - paragraph [ref=e117]: © 2026 Vireist · собрано мастером вручную · контент редактируется через файлы — см. README.md
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { AxeBuilder } = require('@axe-core/playwright');
  3  | 
  4  | test('a11y: главная страница соответствует WCAG AA', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page.locator('#hero-name')).toBeVisible();
  7  |     const results = await new AxeBuilder({ page })
  8  |         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  9  |         .disableRules(['color-contrast'])  // декоративные номера карточек
  10 |         .analyze();
  11 |     expect(results.violations).toEqual([]);
  12 | });
  13 | 
  14 | test('a11y: страница дела доступна', async ({ page }) => {
  15 |     await page.goto('/#/game/001');
  16 |     await expect(page.locator('.doc-title')).toBeVisible();
  17 |     const results = await new AxeBuilder({ page })
  18 |         .withTags(['wcag2a', 'wcag2aa'])
  19 |         .analyze();
> 20 |     expect(results.violations).toEqual([]);
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  21 | });
  22 | 
  23 | test('a11y: навигация с клавиатуры работает', async ({ page }) => {
  24 |     await page.goto('/');
  25 |     await page.keyboard.press('Tab');
  26 |     await expect(page.locator('.logo')).toBeFocused();
  27 |     await page.keyboard.press('Tab');
  28 |     await expect(page.locator('.nav a').first()).toBeFocused();
  29 | });
```