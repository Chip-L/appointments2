# Part 1 – Exploring the TDD Workflow

- [x] validCustomer1 - First Steps with Test-Driven Development 3validCustomer

  - [x] Technical requirements 4

  - [x] Creating a new React project from scratch 4

    - [x] Installing NPM 5

    - [x] Creating a new Jest project 5

    - [x] Bringing in React and Babel 7

  - [x] Displaying data with your first test 8

    - [x] Writing a failing test 8

    - [x] Make it pass 16

    - [x] Making use of the act test helper 18

    - [x] Triangulating to remove hardcoding 20

    - [x] Backtracking on ourselves 22

  - [x] Refactoring your work 25

    - [x] Sharing setup code between tests 25

    - [x] Extracting methods 26

  - [x] Writing great tests 27

    - [x] Red, green, refactor 28

    - [x] Streamlining your testing process 29

  - [x] Summary 30

- [x] 2 - Rendering Lists and Detail Views 33

  - [x] Technical requirements 34

  - [x] Sketching a mock-up 34

  - [x] Creating the new component 35

  - [x] Specifying list item content 40

  - [x] Selecting data to view 43

    - [x] Initial selection of data 43

    - [x] Adding events to a functional component 45

  - [x] Manually testing our changes 49

    - [x] Adding an entry point 49

    - [x] Putting it all together with webpack 51

  - [x] Summary 54

  - [x] Exercises 54

- [x] 3 - Refactoring the Test Suite 57

  - [x] Technical requirements 58

  - [x] Pulling out reusable rendering logic 58

  - [x] Creating a Jest matcher using TDD 61

  - [x] Extracting DOM helpers 70

  - [x] Summary 73

  - [x] Exercises 73

- [x] 4 - Test-Driving Data Input 75

  - [x] Technical requirements 75

  - [x] Adding a form element 76

  - [x] Accepting text input 78

  - [x] Submitting a form 84

    - [x] Submitting without any changes 84

    - [x] Preventing the default submit action 87

    - [x] Submitting changed values 90

  - [x] Duplicating tests for multiple form fields 94

    - [x] Nesting describe blocks 94

    - [x] Generating parameterized tests 95

    - [x] Solving a batch of tests 98

    - [x] Modifying handleChange so that it works with multiple fields 100

    - [x] Testing it out 100

  - [x] Summary 101

  - [x] Exercises 101

- [x] 5 - Adding Complex Form Interactions 103

  - [x] Technical requirements 103

  - [x] Choosing a value from a select box 104

    - [x] Providing select box options 105

    - [x] Preselecting a value 108

  - [x] Constructing a calendar view 111

    - [x] Adding the table 112

    - [x] Adding a header column 113

    - [x] Adding a header row 117

  - [x] Test-driving radio button groups 120

    - [x] Hiding input controls 122

    - [x] Selecting a radio button in a group 127

    - [x] Handling field changes through a component hierarchy 129

  - [x] Reducing effort when constructing components 136

    - [x] Extracting test data builders for time and date functions 137

    - [x] Extracting a test props object 140

  - [x] Summary 144

  - [x] Exercises 145

- [x] 6 - Exploring Test Doubles 147

  - [x] Technical requirements 148

  - [x] What is a test double? 148

    - [x] Learning to avoid fakes 149

  - [x] Submitting forms using spies 149

    - [x] Untangling AAA 150

    - [x] Making a reusable spy function 152

    - [x] Using a matcher to simplify spy expectations 154

  - [x] Spying on the fetch API 157

    - [x] Replacing global functions with spies 158

    - [x] Test-driving fetch argument values 159

    - [x] Reworking existing tests with the side-by-side implementation 162

    - [x] Improving spy expectations with helper functions 166

  - [x] Stubbing fetch responses 167

    - [x] Upgrading spies to stubs 168

    - [x] Acting on the fetch response 168

    - [x] Displaying errors to the user 174

    - [x] Grouping stub scenarios in nested describe contexts 177

  - [x] Migrating to Jest’s built-in test double support 178

    - [x] Using Jest to spy and stub 178

    - [x] Migrating the test suite to use Jest’s test double support 179

    - [x] Extracting fetch test functionality 182

  - [x] Summary 184

  - [x] Exercises 184

- [x] 7 - Testing useEffect and Mocking Components 185

  - [x] Technical requirements 185

  - [x] Mocking child components 186

    - [x] How to mock components, and why? 186

    - [x] Testing the initial component props 188

  - [x] Fetching data on mount with useEffect 191

    - [x] Understanding the useEffect hook 191

    - [x] Adding the renderAndWait helper 193

    - [x] Adding the useEffect hook 194

    - [x] Testing the useEffect dependency list 198

  - [x] Building matchers for component mocks 200

  - [x] Variants of the jest.mock call 204

    - [x] Removing the spy function 205

    - [x] Rendering the children of mocked components 205

    - [x] Checking multiple instances of the rendered component 205

    - [x] Alternatives to module mocks 206

  - [x] Summary 207

  - [x] Exercises 207

- [x] 8 - Building an Application Component 209

  - [x] Technical requirements 209

  - [x] Formulating a plan 210

  - [x] Using state to control the active view 211

  - [x] Test-driving callback props 219

  - [x] Making use of callback values 225

  - [x] Summary 227

  - [x] Exercises 228

# Part 2 – Building Application Features

- [ ] 9 - Form Validation 231

  - [x] Technical requirements 231

  - [x] Performing client-side validation 232

    - [x] Validating a required field 233

    - [x] Generalizing validation for multiple fields 237

    - [x] Submitting the form 246

    - [x] Extracting non-React functionality into a new module 249

  - [ ] Handling server errors 252

  - [ ] Indicating form submission status 254

    - [ ] Testing state before promise completion 255

    - [ ] Refactoring long methods 258

  - [ ] Summary 258

  - [ ] Exercises 259

- [ ] 10 - Filtering and Searching Data 261

  - [ ] Technical requirements 262

  - [ ] Displaying tabular data fetched from an endpoint 263

  - [ ] Paging through a large dataset 268

    - [ ] Adding a button to move to the next page 268

    - [ ] Adjusting the design 272

    - [ ] Adding a button to move to the previous page 274

    - [ ] Forcing design changes using tests 277

  - [ ] Filtering data 279

    - [ ] Refactoring to simplify the component design 283

  - [ ] Performing actions with render props 284

    - [ ] Testing render props in additional render contexts 287

  - [ ] Summary 290

  - [ ] Exercises 291

- [ ] 11 - Test-Driving React Router 293

  - [ ] Technical requirements 293

  - [ ] Designing React Router applications from a test-first perspective 294

    - [ ] A list of all the React Router pieces 294

    - [ ] Splitting tests when the window location changes 294

    - [ ] Up-front design for our new routes 295

  - [ ] Testing components within a router 296

    - [ ] The Router component and its test equivalent 296

    - [ ] Using the Routes component to replace a switch statement 297

    - [ ] Using intermediate components to translate URL state 300

  - [ ] Testing router links 304

    - [ ] Checking the page for hyperlinks 305

    - [ ] Mocking the Link component 306

  - [ ] Testing programmatic navigation 310

  - [ ] Summary 312

  - [ ] Exercise 312

- [ ] 12 - Test-Driving Redux 313

  - [ ] Technical requirements 314

  - [ ] Up-front design for a reducer and a saga 314

    - [ ] Why Redux? 314

    - [ ] Designing the store state and actions 315

  - [ ] Test-driving a reducer 316

    - [ ] Pulling out generator functions for reducer actions 322

    - [ ] Setting up a store and an entry point 323

  - [ ] Test-driving a saga 324

    - [ ] Using expect-redux to write expectations 325

    - [ ] Making asynchronous requests with sagas 328

  - [ ] Switching component state for Redux state 334

    - [ ] Submitting a React form by dispatching a

    - [ ] Redux action 334

    - [ ] Making use of store state within a component 337

    - [ ] Navigating router history in a Redux saga 341

  - [ ] Summary 344

  - [ ] Exercise 344

- [ ] 13 - Test-Driving GraphQL 345

  - [ ] Technical requirements 346

  - [ ] Compiling the schema before you begin 346

  - [ ] Testing the Relay environment 346

    - [ ] Building a performFetch function 347

    - [ ] Test-driving the Environment object construction 351

    - [ ] Test-driving a singleton instance of Environment 355

  - [ ] Fetching GraphQL data from within a component 356

  - [ ] Summary 369

  - [ ] Exercises 369

# Part 3 – Interactivity

- [ ] 14 - Building a Logo Interpreter 373

  - [ ] Technical requirements 373

  - [ ] Studying the Spec Logo user interface 374

  - [ ] Undoing and redoing user actions in Redux 376

    - [ ] Building the reducer 376

    - [ ] Building buttons 390

  - [ ] Saving to local storage via Redux middleware 393

    - [ ] Building middleware 394

  - [ ] Changing keyboard focus 402

    - [ ] Writing the reducer 402

    - [ ] Focusing the prompt 405

    - [ ] Requesting focus in other components 408

  - [ ] Summary 409

- [ ] 15 - Adding Animation 411

  - [ ] Technical requirements 412

  - [ ] Designing animation 412

  - [ ] Building an animated line component 414

  - [ ] Animating with requestAnimationFrame 417

  - [ ] Canceling animations with cancelAnimationFrame 429

  - [ ] Varying animation behavior 431

  - [ ] Summary 437

  - [ ] Exercises 438

- [ ] 16 - Working with WebSockets 439

  - [ ] Technical requirements 439

  - [ ] Designing a WebSocket interaction 440

    - [ ] The sharing workflow 440

    - [ ] The new UI elements 442

    - [ ] Splitting apart the saga 442

  - [ ] Test-driving a WebSocket connection 443

  - [ ] Streaming events with redux-saga 454

  - [ ] Updating the app 460

  - [ ] Summary 463

  - [ ] Exercises 463

# Part 4 – Behavior-Driven Development with Cucumber

- [ ] 17 - Writing Your First Cucumber Test 467

  - [ ] Technical requirements 469

  - [ ] Integrating Cucumber and Puppeteer into your code base 469

  - [ ] Writing your first Cucumber test 470

  - [ ] Using data tables to perform setup 478

  - [ ] Summary 483

- [ ] 18 - Adding Features Guided by Cucumber Tests 485

  - [ ] Technical requirements 487

  - [ ] Adding Cucumber tests for a dialog box 487

  - [ ] Fixing Cucumber tests by testdriving production code 496

    - [ ] Adding a dialog box 496

    - [ ] Updating sagas to a reset or replay state 502

  - [ ] Avoiding timeouts in test code 505

    - [ ] Adding HTML classes to mark animation status 506

    - [ ] Updating step definitions to use waitForSelector 508

  - [ ] Summary 511

  - [ ] Exercise 511

- [ ] 19 - Understanding TDD in the Wider Testing Landscape 513

  - [ ] Test-driven development as a testing technique 513

    - [ ] Best practices for your unit tests 514

    - [ ] Improving your technique 515

  - [ ] Manual testing 516

    - [ ] Demonstrating software 516

    - [ ] Testing the whole product 517

    - [ ] Exploratory testing 517

    - [ ] Debugging in the browser 518

  - [ ] Automated testing 518

    - [ ] Integration tests 518

    - [ ] System tests and end-to-end tests 519

    - [ ] Acceptance tests 519

    - [ ] Property-based and generative testing 519

    - [ ] Snapshot testing 520

    - [ ] Canary testing 521

  - [ ] Not testing at all 521

    - [ ] When quality doesn’t matter 521

    - [ ] Spiking and deleting code 522

  - [ ] Summary 523

# Index 525

# Other Books You May Enjoy 538
