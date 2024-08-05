// Fetches data from the server.
function courses() {
  // fetch data for one mail
  fetch(`/courses/`)
      .then((response) => response.json())
      .then((courses) => {
        //   // Print emails foe view All mail function
        //   viewAllMail(emails, boxName);
          console.log(emails);
      })
      .catch((error) => {
          // print error
          console.log(error);
      });
}
courses()


document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/items/')
      .then(response => response.json())
      .then(data => {
          const itemList = document.getElementById('item-list');
          data.forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = `${item.name}: ${item.description}`;
              itemList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching items:', error));
});
