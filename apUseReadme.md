<h1 align="center">Manament system all api use proper guidelines</h1>

---

[//]: # "Table of Content"

<a name="top"></a>

## Table Of Contents 🙋‍♂️ content

> Click on any topic to go there

- [User Api User API Documentation](#user)
  - [User Get Api](#user-get)
  - [User Add Api](#user-add)
  - [User Update Api](#user-update)
  - [User Role Update Api](#user-role-update)
  - [User Delete Api](#user-delete)

---

- [Department Api Department API Documentation](#department)
  - [Department Get Api](#department-get)
  - [Department Add Api](#department-add)
  - [Department Update Api](#department-update)
  - [Department Delete Api](#department-delete)

---

- [Lab Api Lab API Documentation](#lab)
  - [Lab Get Api](#lab-get)
  - [Lab Add Api](#lab-add)
  - [Lab Update Api](#lab-update)
  - [Lab Delete Api](#lab-delete)

---

- [Teacher Api Teacher API Documentation](#teacher)
  - [Teacher Get Api](#teacher-get)
  - [Teacher Add Api](#teacher-add)
  - [Teacher Update Api](#teacher-update)
  - [Teacher Delete Api](#teacher-delete)

---





<!-- - [Blog Api Blog API Documentation](#blog)
  - [Blog Get Api](#blog-get)
  - [Blog Add Api](#blog-add)
  - [Blog Update Api](#blog-update)
  - [Blog Delete Api](#blog-delete)

--- -->

<a name="user"></a>

**User API Documentation**

ManagementSystem provides a User API that allows you to manage user-related operations. This API includes the following endpoints:

<a name="user-get"></a>

1. **User Get API**

   - Endpoint: `/api/users`
   - Method: GET
   - Description: Retrieve a list of all users in the system.

   **Usage Example:**
   To fetch a list of all users, make a GET request to `/api/users`. This will return a JSON response containing user data.

##### [Go to top:arrow_up: ](#top)

<a name="user-add"></a>

2. **User Add API**

   - Endpoint: `/api/addUser`
   - Method: POST
   - Description: Add a new user to the system.

   **Usage Example:**
   To add a new user, make a POST request to `/api/addUser` with a JSON request body containing user information, such as username, email, and password. The server will create a new user and return a confirmation message.

   ```json
   POST /api/addUser
   Request Body:
   {
     userName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNo": "01711-XXXXXX",
    "userImg": "https://i.ibb.co/CQt5BBG/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall-140725-42637.jpg",
    "role": "student"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="user-update"></a>

3. **User Update API**

   - Endpoint: `/api/updateUser/:id`
   - Method: PUT
   - Description: Update an existing user's information, identified by their unique `id`.

   **Usage Example:**
   To update a user's information, make a PUT or PATCH request to `/api/updateUser/:id`, where `:id` is the unique identifier of the user you want to update. Provide a JSON request body with the fields you wish to update.

   ```json
   PUT /api/updateUser/123
   Request Body:
   {
     userName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNo": "01711-XXXXXX",
    "userImg": "https://i.ibb.co/CQt5BBG/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall-140725-42637.jpg",
    "role": "student"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="user-role-update"></a>

4. **User Role Update API**

   - **Endpoint:** `/api/updateUserRole/:id`
   - **Method:** PATCH
   - **Description:** This API allows you to update the role of an existing user, identified by their unique `id`. The only roles that can be updated are `[student, teacher, admin]`. Attempting to set any other role will result in an error.

   **Usage Example:**
   To update a user's role, make a PATCH request to `/api/updateUserRole/:id`, where `:id` is the unique identifier of the user you want to update. Provide a JSON request body with the "role" field and set it to one of the allowed roles.

   ```http
   PATCH /api/updateUserRole/123
   Request Body:
   {
    "role": "teacher"
   }
   ```

   In the example above, the user with `id` 123 will have their role updated to "teacher".

##### [Go to top:arrow_up: ](#top)

<a name="user-delete"></a>

4. **Delete User API**

   - Endpoint: `/api/deleteUser/:id`
   - Method: DELETE
   - Description: Delete a user from the system, identified by their unique `id`.

   **Usage Example:**
   To delete a user, make a DELETE request to `/api/deleteUser/:id`, where `:id` is the unique identifier of the user you want to delete.

   ```
   DELETE /api/deleteUser/123
   ```

Please ensure that you replace placeholders like `:id` with actual values when making API requests. Additionally, consider implementing proper authentication and authorization mechanisms as required by the ManagementSystem API. For more specific details and any additional headers or parameters needed for authentication, consult the ManagementSystem API documentation or reach out to the API provider.

##### [Go to top:arrow_up: ](#top)

---

<a name="department"></a>

**Department API Documentation**

ManagementSystem provides a Department API that allows you to manage department-related operations. This API includes the following endpoints:

<a name="department-get"></a>

1. **Department Get API**

   - Endpoint: `/api/departments`
   - Method: GET
   - Description: Retrieve a list of all departments in the system.

   **Usage Example:**
   To fetch a list of all departments, make a GET request to `/api/departments`. This will return a JSON response containing department data.

##### [Go to top:arrow_up: ](#top)

<a name="department-add"></a>

2. **Department Add API**

   - Endpoint: `/api/addDepartment`
   - Method: POST
   - Description: Add a new department to the system.

   **Usage Example:**
   To add a new department, make a POST request to `/api/addDepartment` with a JSON request body containing department information, such as departmentname, email, and password. The server will create a new department and return a confirmation message.

   ```json
   POST /api/addDepartment
   Request Body:

   {
   "userImg": "https://i.ibb.co/8b0zVvq/rayhan-al-kavey.png",
   "userName": "Jonathon smith",
   "userTitle": "Sales Representative",
       // Add other department details here as needed
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="department-update"></a>

3. **Department Update API**

   - Endpoint: `/api/updateDepartment/:id`
   - Method: PUT or PATCH
   - Description: Update an existing department's information, identified by their unique `id`.

   **Usage Example:**
   To update a department's information, make a PUT or PATCH request to `/api/updateDepartment/:id`, where `:id` is the unique identifier of the department you want to update. Provide a JSON request body with the fields you wish to update.

   ```json
   PUT /api/updateDepartment/123
   Request Body:
   {
       "userName": "Jonathon smith",
       // Update other department details here as needed
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="department-delete"></a>

4. **Delete Department API**

   - Endpoint: `/api/deleteDepartment/:id`
   - Method: DELETE
   - Description: Delete a department from the system, identified by their unique `id`.

   **Usage Example:**
   To delete a department, make a DELETE request to `/api/deleteDepartment/:id`, where `:id` is the unique identifier of the department you want to delete.

   ```
   DELETE /api/deleteDepartment/123
   ```

Please ensure that you replace placeholders like `:id` with actual values when making API requests. Additionally, consider implementing proper authentication and authorization mechanisms as required by the ManagementSystem API. For more specific details and any additional headers or parameters needed for authentication, consult the ManagementSystem API documentation or reach out to the API provider.

##### [Go to top:arrow_up: ](#top)

---

---

<a name="lab"></a>

**Lab API Documentation**

ManagementSystem provides a Lab API that allows you to manage lab-related operations. This API includes the following endpoints:

<a name="lab-get"></a>

1. **Lab Get API**

   - Endpoint: `/api/labs`
   - Method: GET
   - Description: Retrieve a list of all labs in the system.

   **Usage Example:**
   To fetch a list of all labs, make a GET request to `/api/labs`. This will return a JSON response containing lab data.

##### [Go to top:arrow_up: ](#top)

<a name="lab-add"></a>

2. **Lab Add API**

   - Endpoint: `/api/addLab`
   - Method: POST
   - Description: Add a new lab to the system.

   **Usage Example:**
   To add a new lab, make a POST request to `/api/addLab` with a JSON request body containing lab information, such as labname, email, and password. The server will create a new lab and return a confirmation message.

   ```json
   POST /api/addLab
   Request Body:

   {
     "labName": "Computer lab",
    "labImg": "https://i.ibb.co/LdZ9Wr7/modern-equipped-computer-lab-23-2149241198.jpg"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="lab-update"></a>

3. **Lab Update API**

   - Endpoint: `/api/updateLab/:id`
   - Method: PUT or PATCH
   - Description: Update an existing lab's information, identified by their unique `id`.

   **Usage Example:**
   To update a lab's information, make a PUT or PATCH request to `/api/updateLab/:id`, where `:id` is the unique identifier of the lab you want to update. Provide a JSON request body with the fields you wish to update.

   ```json
   PUT /api/updateLab/123
   Request Body:
   {
     "labName": "Computer lab",
    "labImg": "https://i.ibb.co/LdZ9Wr7/modern-equipped-computer-lab-23-2149241198.jpg"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="lab-delete"></a>

4. **Delete Lab API**

   - Endpoint: `/api/deleteLab/:id`
   - Method: DELETE
   - Description: Delete a lab from the system, identified by their unique `id`.

   **Usage Example:**
   To delete a lab, make a DELETE request to `/api/deleteLab/:id`, where `:id` is the unique identifier of the lab you want to delete.

   ```
   DELETE /api/deleteLab/123
   ```

Please ensure that you replace placeholders like `:id` with actual values when making API requests. Additionally, consider implementing proper authentication and authorization mechanisms as required by the ManagementSystem API. For more specific details and any additional headers or parameters needed for authentication, consult the ManagementSystem API documentation or reach out to the API provider.

##### [Go to top:arrow_up: ](#top)

---




---

<a name="teacher"></a>

**Teacher API Documentation**

ManagementSystem provides a Teacher API that allows you to manage teacher-related operations. This API includes the following endpoints:

<a name="teacher-get"></a>

1. **Teacher Get API**

   - Endpoint: `/api/teachers`
   - Method: GET
   - Description: Retrieve a list of all teachers in the system.

   **Usage Example:**
   To fetch a list of all teachers, make a GET request to `/api/teachers`. This will return a JSON response containing teacher data.

##### [Go to top:arrow_up: ](#top)

<a name="teacher-add"></a>

2. **Teacher Add API**

   - Endpoint: `/api/addTeacher`
   - Method: POST
   - Description: Add a new teacher to the system.

   **Usage Example:**
   To add a new teacher, make a POST request to `/api/addTeacher` with a JSON request body containing teacher information, such as labname, email, and password. The server will create a new teacher and return a confirmation message.

   ```json
   POST /api/addTeacher
   Request Body:

   {
     "labName": "Computer teacher",
    "labImg": "https://i.ibb.co/LdZ9Wr7/modern-equipped-computer-teacher-23-2149241198.jpg"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="teacher-update"></a>

3. **Teacher Update API**

   - Endpoint: `/api/updateTeacher/:id`
   - Method: PUT or PATCH
   - Description: Update an existing teacher's information, identified by their unique `id`.

   **Usage Example:**
   To update a teacher's information, make a PUT or PATCH request to `/api/updateTeacher/:id`, where `:id` is the unique identifier of the teacher you want to update. Provide a JSON request body with the fields you wish to update.

   ```json
   PUT /api/updateTeacher/123
   Request Body:
   {
    "teacherName": "David Brown",
    "teacherImg": "https://i.ibb.co/BP7Cfy2/front-view-man-doing-presentation-during-meeting-23-2148817046.jpg",
    "designation": "Lecturer",
    "contactNo": "01556789012",
    "email": "david.brown@example.com",
    "facebookUrl": "https://www.facebook.com/davidbrown"
   }
   ```

##### [Go to top:arrow_up: ](#top)

<a name="teacher-delete"></a>

4. **Delete Teacher API**

   - Endpoint: `/api/deleteTeacher/:id`
   - Method: DELETE
   - Description: Delete a teacher from the system, identified by their unique `id`.

   **Usage Example:**
   To delete a teacher, make a DELETE request to `/api/deleteTeacher/:id`, where `:id` is the unique identifier of the teacher you want to delete.

   ```
   DELETE /api/deleteTeacher/123
   ```

Please ensure that you replace placeholders like `:id` with actual values when making API requests. Additionally, consider implementing proper authentication and authorization mechanisms as required by the ManagementSystem API. For more specific details and any additional headers or parameters needed for authentication, consult the ManagementSystem API documentation or reach out to the API provider.

##### [Go to top:arrow_up: ](#top)

---
















