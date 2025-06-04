# Class Connect - Software Design 

Version 1  
Prepared by Alice Beback\
Class Connect\
May 27, 2025

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Product Overview](#1-product-overview)
* 2 [Use Cases](#2-use-cases)
  * 2.1 [Use Case Model](#21-use-case-model)
  * 2.2 [Use Case Descriptions](#22-use-case-descriptions)
    * 2.2.1 [Actor: Teacher](#221-actor-teacher)
    * 2.2.2 [Actor: Student](#222-actor-student) 
* 3 [UML Class Diagram](#3-uml-class-diagram)
* 4 [Database Schema](#4-database-schema)

## Revision History
| Name | Date    | Reason For Changes  | Version   |
| ---- | ------- | ------------------- | --------- |
|  Al  | 5/27    | Initial Design      |    1      |
|      |         |                     |           |
|      |         |                     |           |

## 1. Product Overview
Class Connect is a simple, comprehensive, easy to use web app with the goal of providing classes to students in various fields. Students and teachers make use of the centralized platform to meet their needs. Teachers create and publish classes, students sign up for any available classes that they are interested in.

## 2. Use Cases
### 2.1 Use Case Model
![Use Case Model](https://github.com/uncg-csc340/su25-team0/blob/main/object-oriented-design/use-case-model.png)

### 2.2 Use Case Descriptions

#### 2.2.1 Actor: Teacher
##### 2.2.1.1 Sign Up
A teacher can sign up to create their profile with their name, email, password, and bio. Emails must be unique.
##### 2.2.1.2 Log In
A teacher shall be able to sign in using their registred email and password. After logging in, the teacher shall be directed their dashboard where they see an overview of their classes and stats.
##### 2.2.1.3 Update Profile
A teacher shall be to modify their profile by going to their profile page. They can change their email, password, profile picture, and biography.
##### 2.2.1.4 Create Class
The teacher shall be able to create a new class listing. They would provide a class name, code, description, and schedule. This class will be created to be associated with only this teacher.
##### 2.2.1.4 Manage Class Content
A teacher shall be able to add and remove class assignments and announcements, as well as assign grades to their students.

#### 2.2.2 Actor: Student
##### 2.2.2.1 Sign Up
A student can sign up to create their profile with their name, email, password, and bio. Emails must be unique.
##### 2.2.2.2 Log In
A teacher shall be able to sign in using their registred email and password. After logging in, the student shall be directed their dashboard where they see an overview of their classes and stats.
##### 2.2.2.3 Browse Classes
A student shall be able to view available classes. They can do this from the home page or using a search function. They can also filter classes by name, subject, or teacher. They will also be able to select one class and view more details.
##### 2.2.1.4 Sign Up for Class
Upon selecting a class, a student shall be able to sign up for the class usin a one-click action. This class will then appear on their dashboard, and they will be able to participate in the class.
##### 2.2.1.5 Drop Class
A student may drop/unregister for a class from the class page.

## 3. UML Class Diagram
![UML Class Diagram](https://github.com/uncg-csc340/su25-team0/blob/main/object-oriented-design/class-diagram.png)
## 4. Database Schema
![UML Class Diagram](https://github.com/uncg-csc340/su25-team0/blob/main/object-oriented-design/database-schema.png)
