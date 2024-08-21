

const renderCardsUser = (data,coursContainer) => {
    console.log("data",data)
      coursContainer.innerHTML += data
        .map(
          (item) => `
            <div class="card" id="${item.id}" >
              <img src="${item.image}" alt="${item.name}">
              <div class="card-content">
                  <h2 class="card-title">${item.name}</h2>
                  <p class="card-description">${item.description}</p>
                  
                 <button class="card-button" type="button">${favorite}</button>
              </div>
            </div>
          `
        ).join("");
    
      // إضافة مستمع الحدث لجميع البطاقات بعد إضافتها إلى DOM
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
          event.preventDefault(); // منع الانتقال الافتراضي
          const itemId = card.id; // احصل على معرف العنصر
          console.log(itemId)
          const itemTitle = card.querySelector('.card-title').textContent; // احصل على عنوان العنصر
          document.title = `${itemTitle} - تفاصيل`; // تغيير عنوان الصفحة
          const newUrl = `/course/${itemId}`;
          history.pushState({ path: newUrl }, '', newUrl);
          fetchOneCourses(itemId,coursContainer)
        });
      });
    };
    
    const fetchOneCourses = async (id,coursContainer) => {
      try {
        const courses = await getCourse(id);
        displayItemDetails(courses,coursContainer);
      } catch (error) {
        console.error("Error:", error) ;
      }
    };
    


const displayItemDetails = (data,coursContainer) => {
    coursContainer.innerHTML=''
    console.log("Displaying details for:", data);
    const informtian= document.getElementById('informtian')
    coursContainer.innerHTML=`
    <div class='card-datiles' id="${data.course.id}">
    <img src="${ data.course.image}" alt="${ data.course.name}">
    <div class="card-content">
        <h2 class="card-title">${data.course.name}</h2>
        <p class="card-description">Description:${data.course.description}</p>
    </div>
  </div>`
  const likesCount = data.course.likes.filter(item => item.likes).length;
  const unlikesCount = data.course.likes.filter(item => item.unlikes).length;
  informtian.innerHTML+= `
    <div>
    <h2 class="card-title">Course Name: ${data.course.name}</h2>
    <h2 class="card-title">Add BY: ${data.user.username}</h2>
    <p>Likes:${likesCount}</p>
     <p>UnLikes:${unlikesCount}</p>
    <p> Creat At : ${new Date(data.course.created_at)} </p>
     </div>
  `
  
  
  data.course.comments.forEach(comment =>{
  const createdAtDate = new Date(comment.created_at)
  
   coursContainer.innerHTML+= `
    <div>
    <p id="${comment.user}">Add By ${data.course.user.username}  </p>
    <p> ${comment.comment} </p> 
    <p>Created At: ${createdAtDate} </p>
      <div class="form-group">
      <label for="comments">Add Comment</label>
      <textarea class="form-control" name="comments" id="comments" cols="20" rows="5"></textarea>
      </div>
  <input type="submit" id="add-comments" class="btn btn-primary float-right m-3" value="Comment"/>
    </div>

  `
  })
  };


export { displayItemDetails,renderCardsUser };