# Software Requirements Specification
## For SpartanParadigm

Version 1.2  
Prepared by <Amari DeVaughn, Camden Gregory>   
Created 5/26/2025 

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
  * 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * 1.4 [References](#14-references)
  * 1.5 [Document Overview](#15-document-overview)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Functions](#21-product-functions)
  * 2.2 [Product Constraints](#22-product-constraints)
  * 2.3 [User Characteristics](#23-user-characteristics)
  * 2.4 [Assumptions and Dependencies](#24-assumptions-and-dependencies)
* 3 [Requirements](#3-requirements)
  * 3.1 [Functional Requirements](#31-functional-requirements)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Non-Functional Requirements](#32-non-functional-requirements)
    * 3.2.1 [Performance](#321-performance)
    * 3.2.2 [Security](#322-security)
    * 3.2.3 [Reliability](#323-reliability)
    * 3.2.4 [Availability](#324-availability)
    * 3.2.5 [Compliance](#325-compliance)
    * 3.2.6 [Cost](#326-cost)
    * 3.2.7 [Deadline](#327-deadline)

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|---------------------|---------|
| Cam  | 5/26 |  Initial SRS          | 1.0  |
| Amari | 5/26 | Formatting & Content | 1.1  |
| Amari | 6/17 | Removed Admin Use Case | 1.2 |


## 1. Introduction

### 1.1 Document Purpose
The purpose of this SRS is to define the client and developer requirements for the Spartan Pardigm blog app.
Client system requirements look from the client’s perspective. These include a description of the unique types of users served by the app.
Developer system requirements look from a software dev’s perspective. These include in-depth description of functional, data, performance, and other integral needs.

### 1.2 Product Scope
Spartan Paradigm is a blog-style web app for UNCG students to connect and share ideas and lessons they've learned with eachother. We hope for users and contributers to be inspired or taught by their peers. Spartan Paradigm should provide thought provoking discussion to its users and allow for meaningful academic exploration outside of the classroom. Whether one is a student or instructor, Spartan Paradigm allows for efficient idea sharing and organized collaboration on topics specific to their interests and desires. 

### 1.3 Definitions, Acronyms and Abbreviations    

| Reference   | Definition |
|-------------|------------|
| Java        | A programming language originally developed by James Gosling at Sun Microsystems. We will be using this language to build Class Connect. |
| PostgreSQL  | Open-source relational database management system. |
| SpringBoot  | An open-source Java-based framework used to create a micro Service. This will be used to create and run our application. |
| Spring MVC  | Model-View-Controller. This is the architectural pattern that will be used to implement our system. |
| Spring Web  | Will be used to build our web application by using Spring MVC. This is one of the dependencies of our system. |
| RESTful API | A Representational State Transfer (REST)–style API that uses standard HTTP methods for CRUD operations to interface the frontend and backend of our application. |
| JavaScript  | An object-oriented computer programming language commonly used to create interactive effects within web browsers. Will be used in conjunction with HTML and CSS to make the web app. |
| React       | A JavaScript library for building composable, declarative user interfaces using components and a virtual DOM for efficient rendering. |
| Next.Js     | Next.js is an open-source web development framework built on top of Node.Js, providing React-based web applications with server-side rendering and static rendering.|
| TailwindCSS | A utility-first CSS framework that provides low-level, atomic classes for rapidly building custom, responsive UIs without writing custom CSS. |

### 1.4 References
- https://docs.oracle.com/en/java/javase/21/  
- https://www.postgresql.org/docs/17/  
- https://docs.spring.io/spring-boot/docs/3.4.5/reference/html/  
- https://react.dev/learn  
- https://nextjs.org/docs  
- https://tailwindcss.com/docs  

### 1.5 Document Overview
Section 1 contains a general introduction to Spartan Paradigm, intended for any reader. Section 2 is focused on Spartan Paradigm functionality, design, and its features. This section is for customers and stakeholders. Section 3 defines the requirements and constraints for Spartan Paradigm as well as its development process. This section is intended for stakeholders, especially the dev team.

## 2. Product Overview
Spartan Paradigm is a simple to use blog web app that is designed for students and instructors to share informative content with one another. 

### 2.1 Product Functions
- **VISITOR**
    * View blogs posted to Spartan Paradigm
    * Interact with posts via comments, liking, or subscribing to the author. 
    * Connect with authors by adding them as friends.
    * Ability to apply for contributer status. 
    * AI-Powered TLDR Blog Summaries
- **CONTRIBUTERS**
    * All VISITOR functions (- apply for contributer)
    * Ability to draft, save, post, and delete blogs to or from Spartan Paradigm.
    * View statistics for their blogs and account (views, interactions, etc.)
    * View Motivation Quotes
    * Earn Leaderboard spots


### 2.2 Product Constraints
Spartan Paradigm will operate only on environments that support Java JDK 21. It is developed using Spring Boot 3.4.5 for the backend and PostgreSQL 17 for database management. Current development uses the free tier of PostgreSQL, which may restrict database size and performance, especially as messaging and interaction history grow. The frontend depends on React 19 and Next.js 15, and assumes users are accessing the platform from modern, standards-compliant web browsers. Because the project is constrained by a short timeline and limited resources, not all planned features may be available at launch, and some may be deferred to later iterations.
  
### 2.3 User Characteristics
The platform is designed for students and instructors who want to share and interact with educational content. Most users will have basic digital literacy, such as navigating websites and filling out forms. Advanced tasks—such as messaging, applying for contributor access, or managing posts—are supported with intuitive design patterns and do not require technical knowledge. Users are expected to become comfortable with the interface after minimal use, and role-specific guidance for contributors

### 2.4 Assumptions and Dependencies
Spartan Paradigm depends on a Java-based backend (JDK 21), Spring Boot for API and business logic, and PostgreSQL for storing data such as posts, messages, and user relationships. The frontend relies on React and Next.js for fast rendering and smooth navigation. RESTful communication connects the frontend to backend services. Development assumes a Unix-compatible environment and is being conducted in VS Code.

## 3. Requirements

### 3.1 Functional Requirements 

- FR0: The system will allow visitors to create accounts with visitor privileges.  
  * Each account shall have a unique identifier assigned at the time of creation.

  * Each account will have VISITOR priviledges until CONTRIBUTER priviledges applied for, authenticated, and granted.

  * Any account may be deleted at anytime by its owner. 

- FR1: The system shall allow VISITOR/CONTRIBUTORS to browse through the list of available blog posts.

- FR2: The system shall allow VISITOR/CONTRIBUTORS to interact with available blog posts.  
   * All users may view, comment, like, and subscribe to blog posts.

- FR3: The system shall allow VISITOR to apply for CONTRIBUTOR status.

- FR4: CONTRIBUTORS have permissions to draft, edit, post, and delete their blogs to the system at any time.

- FR5: VISITOR/CONTRIBUTORS will be able to edit their profile at any time.

- FR6: The system shall allow CONTRIBUTORS to view their post analytics at any time.  
  * Post analytics includes viewer count, interaction data, demographic data, and other stats to gauge engagement.

- FR7: The system shall allow CONTRIBUTORS to reply to comments on their blogs with an authorship pin to verify them as the poster.

-FR8: The system shall allow all users to comment on blog posts 

-FR9: The system shall allow all users to summarize blog posts

#### 3.1.1 User Interfaces  
Spartan Paradigm features a responsive web-based interface built with TailwindCSS, React, and Next.js, designed for ease of use across desktop and mobile devices. All users will interact with a consistent layout that includes a navigation bar, content feed, and contextual action buttons like Like, Comment, and Share. Contributors have access to a rich text editor for drafting posts, a dashboard for viewing engagement metrics, and tools to manage their audience. Error messages appear inline, and visual feedback like loading spinners and success banners are used to guide interaction.

#### 3.1.2 Hardware Interfaces  
Mobile and desktop devices with web browsing capabilities.

#### 3.1.3 Software Interfaces  
- **Backend:**  
  - **Java JDK 21**: Core language runtime and development tools for backend logic.  
  - **Spring Boot 3.4.5**: Backend framework for RESTful APIs, dependency injection, and configuration.  
  - **PostgreSQL 17**: Relational database for persisting application data.

- **Frontend:**  
  - **React v19**: UI rendering and user interaction layer.  
  - **Next.js 15**: Routing and build optimization for React.

- **Services and Communication:**  
  - **API Layer (Spring Boot):**  
    - Exposes RESTful endpoints for domain logic.  
  - **Database Layer (PostgreSQL 17):**  
    - Stores structured, normalized data with indexing.  
    - Supports transactional consistency.  
  - **Frontend Layer (Next.js + React):**  
    - Fetches backend data using `fetch()` or Axios.  
    - Manages state with React hooks or external libraries.

---

## 3.2 Non-Functional Requirements

#### 3.2.1 Performance  
- NFR0: Load all primary pages within 2 seconds under typical network conditions to maintain user engagement.  
- NFR1: Database queries and 3rd party API calls should return results within 500 milliseconds to maintain seamless user experience.

#### 3.2.2 Security  
- NFR3: System will be available only to authorized users, using their username and password.

#### 3.2.3 Reliability  
- NFR4: Spartan Paradigm must achieve a minimum uptime of 99% to be reliable enough for consistent academic and social interactions.

#### 3.2.4 Availability  
- NFR5: Critical errors should not exceed 1 per week.  
- NFR6: Non-critical errors (e.g., UI glitches) must not interrupt user workflows and should be recoverable without requiring a page refresh or restart.

#### 3.2.5 Compliance  
- NFR7: Spartan Paradigm should follow academic and project-level guidelines provided by the course instructor.

#### 3.2.6 Cost
We expect this project to cost $0

#### 3.2.7 Deadline
Final Project must be complete by June 18th
