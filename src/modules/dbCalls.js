 const remoteURL = "http://localhost:5002"
const eventsURL = `${remoteURL}/events`
const messagesURL = `${remoteURL}/messages`
const tasksURL = `${remoteURL}/tasks`
const usersURL = `${remoteURL}/users`
const friendsURL = `${remoteURL}/friends`

export default Object.create(null, {
    get: {
        value: function (URL, id) {
            return fetch(`${URL}/${id}`).then(e => e.json())
        }
    },
    all: {
        value: function (URL) { console.log("url", URL)
            return fetch(`${URL}`).then(e => e.json())
        }
    },
    delete: {
        value: function (id, URL) {
            return fetch(`${URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(e => e.json())
        }
    },
    post: {
        value: function (newObj, URL) {
            return fetch(`${URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObj)
            }).then(data => data.json())
        }
    },
    put: {
        value: function (URL, editObj) {
            return fetch(`${URL}/${editObj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editObj)
            }).then(data => data.json());
        }
    }
})