1. عرض جميع الفروع المحلية:

`git branch`

2. عرض جميع الفروع المحلية والبعيدة:
`git branch -a
`


3. عرض الفروع البعيدة فقط:
`git branch -r
`
44. عرض الفروع مع تفاصيل إضافية:
`git branch -vv
`

لمعرفة حالة الفروع في Git، يمكنك استخدام الأوامر التالية لمعرفة حالة الفرع الحالي مقارنةً بالفروع الأخرى، مثل ما إذا كان الفرع محدثًا أو إذا كانت هناك تغييرات لم يتم دمجها بعد.

1. عرض حالة الفرع الحالي:
bash
Copy code
git status
يُظهر هذا الأمر حالة العمل الحالية، بما في ذلك الملفات المعدلة، الملفات الجديدة غير المضافة، وأي تغييرات محلية لم يتم الالتزام بها. كما يوضح ما إذا كان الفرع الحالي متزامنًا مع الفرع البعيد (remote).

2. مقارنة الفرع الحالي مع الفرع البعيد:
bash
Copy code
git status -sb
يُظهر هذا الأمر مقارنة بين الفرع الحالي والفرع البعيد الذي يتبعه. إذا كان هناك اختلاف، سيظهر عدد الـ commits التي تحتاج إلى دفعها (push) أو سحبها (pull).

3. مقارنة فرعين معينين:
bash
Copy code
git diff <branch1> <branch2>
يقارن هذا الأمر بين فرعين معينين (يمكنك استخدام HEAD لتمثيل الفرع الحالي). على سبيل المثال، لمعرفة الاختلافات بين الفرع الحالي وفرع main:

bash
Copy code
git diff main
4. عرض الفروع التي تم دمجها أو لم يتم دمجها بعد:
عرض الفروع التي تم دمجها في الفرع الحالي:

bash
Copy code
git branch --merged
يظهر هذا الأمر جميع الفروع التي تم دمجها في الفرع الحالي، مما يعني أنه تم دمج جميع التغييرات من هذه الفروع إلى الفرع الحالي.

عرض الفروع التي لم يتم دمجها في الفرع الحالي:

bash
Copy code
git branch --no-merged
يظهر هذا الأمر الفروع التي لم يتم دمجها بعد في الفرع الحالي.

5. عرض السجل الرسومي مع حالة الفروع:
bash
Copy code
git log --oneline --graph --decorate --all