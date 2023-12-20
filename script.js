document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

async function fetchData() {
  try {
    const url = "http://localhost:3000/users";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Något gick fel med förfrågan: " + response.statusText);
    }
    const users = await response.json();
    createUsersList(users);
  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
}

function createUsersList(users) {
  const ul = document.createElement("ul");
  ul.className = "user-list";
  console.log("Creating users list with users:", users);

  users.forEach((user) => {
    const li = document.createElement("li");

    li.textContent = `${user.firstName} ${user.lastName} - ${user.username}`;
    li.style.backgroundColor = user.color;
    li.style.color = "black";
    ul.appendChild(li);
  });

  document.getElementById("userList").appendChild(ul);
}
