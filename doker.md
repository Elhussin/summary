1. إيقاف جميع الحاويات:
أولاً، يجب عليك إيقاف أي حاويات قيد التشغيل. استخدم هذا الأمر:

bash
Copy code
docker stop $(docker ps -aq)
هذا الأمر يوقف جميع الحاويات.

2. حذف جميع الحاويات:
بعد إيقاف الحاويات، يمكنك حذف جميع الحاويات باستخدام الأمر التالي:

bash
Copy code
docker rm $(docker ps -aq)
هذا سيحذف جميع الحاويات المتوقفة.

3. حذف جميع الصور:
لحذف جميع الصور (images) التي تم تنزيلها على جهازك:

bash
Copy code
docker rmi $(docker images -q)
هذا سيحذف جميع الصور التي تم تنزيلها من Docker.



4. حذف جميع الشبكات غير المستخدمة:
يمكنك أيضًا حذف جميع الشبكات غير المستخدمة بواسطة هذا الأمر:

bash
Copy code

docker network prune

5. حذف جميع الحجوم (volumes) غير المستخدمة:
إذا كنت ترغب في حذف جميع الحجوم غير المستخدمة (volumes):

bash
Copy code
docker volume prune



6. حذف كل شيء في Docker (الحاويات، الصور، الشبكات، الحجوم):
إذا كنت ترغب في تنظيف Docker بشكل كامل (مما يؤدي إلى حذف كل شيء):

bash
Copy code
docker system prune -a
هذا سيحذف كل شيء (الحاويات، الصور، الشبكات، الحجوم) غير المستخدم.

docker run -d -p 8000:8000 --name your_container_name your_image_name
