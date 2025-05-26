# Software Requirements Specification
## For <SpartanParadigm>

Version 0.1  
Prepared by <Amari DeVaughn, Camden Gregory>  
<Paradigm>  
<5/26/2025> 

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
| Name | Date    | Reason For Changes  | Version   |
| Cam  | 5/26    | initial SRS         | 1.0       |
|      |         |                     |           |
|      |         |                     |           |
|      |         |                     |           |

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
| API         | Application Programming Interface. This will be used to interface the backend and the frontend of our application. |
| HTML        | Hypertext Markup Language. This is the code that will be used to structure and design the web application and its content. |
| CSS         | Cascading Style Sheets. Will be used to add styles and appearance to the web app. |
| JavaScript  | An object-oriented computer programming language commonly used to create interactive effects within web browsers. Will be used in conjunction with HTML and CSS to make the web app. |
| VS Code     | An integrated development environment (IDE) for Java. This is where our system will be created|
| Node.Js     | a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. |
| Next.Js     | Next.js is an open-source web development framework built on top of Node.Js, providing React-based web applications with server-side rendering and static rendering.|

### 1.4 References
[https://spring.io/guides](https://spring.io/guides)
[https://www.geeksforgeeks.org/nextjs/](https://www.geeksforgeeks.org/nextjs/)
List any other documents or Web addresses to which this SRS refers. These may include user interface style guides, contracts, standards, system requirements specifications, use case documents, or a vision and scope document. Provide enough information so that the reader could access a copy of each reference, including title, author, version number, date, and source or location.

### 1.5 Document Overview
Section 1 contains a general introduction to Spartan Paradigm, intended for any reader. Section 2 is focused on Spartan Paradigm functionality, design, and its features. This section is for customers and stakeholders. Section 3 defines the requirements and constraints for Spartan Paradigm as well as its development process. This section is intended for stakeholders, especially the dev team.

## 2. Product Overview
Spartan Paradigm is a simple to use blog web app that is designed for students and instructors to share informative content with one another. 

### 2.1 Product Functions
Summarize the major functions the product must perform or must let the user perform. Details will be provided in Section 3, so only a high level summary (such as a bullet list) is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or object class diagram, is often effective.

- USERS
    * View blogs posted to Spartan Paradigm
    * Interact with posts via comments, liking, or subscribing to the author. 
    * Connect with authors by adding them as friends.
    * Directly message friends who have added them back. 
    * Ability to apply for contributer status (after interacting with 3 or more posts). 
- CONTRIBUTERS
    * All USER functions (- apply for contributer)
    * Ability to draft, save, post, and delete blogs to or from Spartan Paradigm.
    * Ability to block any users (- admins) from viewing their posts. 
    * View statistics for their blogs and account (Viewer demographics, interaction count, etc.)
- ADMINS
    * Manage user access – Approve, suspend, or remove user accounts.
    * Moderate content – Review flagged posts and ensure content aligns with platform guidelines.
    * Oversee platform activity – View system-wide stats and manage featured content

### 2.2 Product Constraints
This subsection should provide a general description of any other items that will limit the developer’s options. These may include:  

* Interfaces to users, other applications or hardware.  
* Quality of service constraints.  
* Standards compliance.  
* Constraints around design or implementation.
  
### 2.3 User Characteristics
Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the most important user classes for this product from those who are less important to satisfy.

### 2.4 Assumptions and Dependencies
List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan).

## 3. Requirements

### 3.1 Functional Requirements 
This section specifies the software product's requirements. Specify all of the software requirements to a level of detail sufficient to enable designers to design a software system to satisfy those requirements, and to enable testers to test that the software system satisfies those requirements.

FR0: The system will allow users to create accounts with user priviledges. 
    * Each account shall have a unique identifier assigned at the time of creation.
    * Each account will have USER priviledges until CONTRIBUTER priviledges applied for, authenticated, and granted.
    * Any account may be deleted at anytime by its owner. 
FR1: The system shall allow USERS/CONTRIBUTERS/ADMINS to browse through the list of available blog posts.
FR2: The system shall allow USERS/CONTRIBUTERS/ADMINS to interact with available blog posts. 
    * All users may view, comment, like, and subscribe to blog posts. 
FR3: The system shall allow USERS to apply for CONTRIBUTER status after interacting with a minimum of THREE blog posts. 
FR4: CONTRIBUTERS have permissions to draft, edit, post, and delete their blogs to the system at any time. 
FR5: USERS/CONTRIBUTERS/ADMINS will be able to edit their profile at any time.
FR6: The system shall allow CONTRIBUTERS to view their post analytics at anytime. 
    * post analytics includes viewer count, interaction data, demographical data, and other stats to gauge engagement. 
FR7: The system shall allow CONTRIBUTERS to reply to comments on their blogs with an authorship pin to verify them as the poster. 
FR8: The system shall allow ADMINS to manually approve users applying for contributer (blogger) status. 
FR9: The system will allow ADMINS to suspend or remove USER/CONTRIBUTER accounts. 
FR10: Admins may moderate content through reviewing, editing, or deleting blog posts to ensure proper guidelines are followed. 
FR11: ADMINS may access server wide stats to help moderate content.

#### 3.1.1 User interfaces
Define the software components for which a user interface is needed. Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Details of the user interface design should be documented in a separate user interface specification.

Could be further divided into Usability and Convenience requirements.

#### 3.1.2 Hardware interfaces
Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used.

#### 3.1.3 Software interfaces
Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint.

### 3.2 Non Functional Requirements 

#### 3.2.1 Performance
If there are performance requirements for the product under various circumstances, state them here and explain their rationale, to help the developers understand the intent and make suitable design choices. Specify the timing relationships for real time systems. Make such requirements as specific as possible. You may need to state performance requirements for individual functional requirements or features.

#### 3.2.2 Security
Specify any requirements regarding security or privacy issues surrounding use of the product or protection of the data used or created by the product. Define any user identity authentication requirements. Refer to any external policies or regulations containing security issues that affect the product. Define any security or privacy certifications that must be satisfied.

#### 3.2.3 Reliability
Specify the factors required to establish the required reliability of the software system at time of delivery.

#### 3.2.4 Availability
Specify the factors required to guarantee a defined availability level for the entire system such as checkpoint, recovery, and restart.

#### 3.2.5 Compliance
Specify the requirements derived from existing standards or regulations

#### 3.2.6 Cost
We expect this project to cost $0

#### 3.2.7 Deadline
Final Project must be complete by June 18th