"""
AI Study Assistant - Comprehensive Quiz Question Bank
Contains 105+ high-quality, educational multiple-choice questions across 6 core subjects:
- Python (16 questions)
- Machine Learning (21 questions)
- Artificial Intelligence (16 questions)
- DBMS (21 questions)
- Data Science (16 questions)
- Computer Networks (16 questions)
Total: 106 questions.
"""

QUIZ_DATA = [
    # =========================================================================
    # PYTHON (16 Questions)
    # =========================================================================
    {
        "id": "py-q01",
        "subject": "Python",
        "topic": "Introduction to Python",
        "difficulty": "Easy",
        "question": "Who created the Python programming language and in what year was it first released?",
        "options": [
            "Dennis Ritchie in 1972",
            "Guido van Rossum in 1991",
            "Bjarne Stroustrup in 1985",
            "James Gosling in 1995"
        ],
        "correct": 1,
        "explanation": "Guido van Rossum created Python and released version 0.9.0 in February 1991 at CWI in the Netherlands."
    },
    {
        "id": "py-q02",
        "subject": "Python",
        "topic": "Introduction to Python",
        "difficulty": "Easy",
        "question": "How does Python primarily structure and delimit code blocks?",
        "options": [
            "Curly braces { }",
            "Begin and End keywords",
            "Consistent indentation whitespace",
            "Semicolons at the end of each line"
        ],
        "correct": 2,
        "explanation": "Python uses whitespace indentation to define code blocks (functions, loops, classes) rather than curly braces or keywords."
    },
    {
        "id": "py-q03",
        "subject": "Python",
        "topic": "Data Types",
        "difficulty": "Easy",
        "question": "Which of the following data types in Python is MUTABLE?",
        "options": [
            "tuple",
            "str",
            "list",
            "int"
        ],
        "correct": 2,
        "explanation": "Lists are mutable in Python; elements can be modified, appended, or removed in-place. Strings, tuples, and integers are immutable."
    },
    {
        "id": "py-q04",
        "subject": "Python",
        "topic": "Operators",
        "difficulty": "Easy",
        "question": "What is the result of the expression 17 // 4 in Python?",
        "options": [
            "4.25",
            "4",
            "4.0",
            "1"
        ],
        "correct": 1,
        "explanation": "The // operator performs floor division, rounding down to the nearest integer, which yields 4."
    },
    {
        "id": "py-q05",
        "subject": "Python",
        "topic": "Operators",
        "difficulty": "Medium",
        "question": "What is the fundamental difference between the '==' and 'is' operators in Python?",
        "options": [
            "'==' compares object identity in memory, while 'is' compares value equality",
            "'==' compares value equality, while 'is' checks whether both operands reference the identical object in memory",
            "They are exact synonyms and can be used interchangeably",
            "'is' only works with numeric values, while '==' works with strings"
        ],
        "correct": 1,
        "explanation": "'==' tests for equality of values (invoking __eq__), while 'is' tests for object identity (checking if id(a) == id(b))."
    },
    {
        "id": "py-q06",
        "subject": "Python",
        "topic": "Conditionals",
        "difficulty": "Medium",
        "question": "Which of the following values is evaluated as TRUTHY in a Python conditional check?",
        "options": [
            "[] (empty list)",
            "'' (empty string)",
            "None",
            "[-1]"
        ],
        "correct": 3,
        "explanation": "Any non-empty collection (including a list containing -1) evaluates to True in Python. Empty collections, 0, and None are falsy."
    },
    {
        "id": "py-q07",
        "subject": "Python",
        "topic": "Loops",
        "difficulty": "Medium",
        "question": "Under what circumstance does the 'else' block attached to a Python 'for' loop execute?",
        "options": [
            "It executes only when the loop terminates prematurely using 'break'",
            "It executes when the loop finishes iterating normally without encountering a 'break'",
            "It executes after every single iteration of the loop",
            "It executes only if an exception is raised inside the loop body"
        ],
        "correct": 1,
        "explanation": "A loop's 'else' clause runs when the loop completes all iterations normally without hitting a 'break' statement."
    },
    {
        "id": "py-q08",
        "subject": "Python",
        "topic": "Functions",
        "difficulty": "Medium",
        "question": "Why is using a mutable default argument like `def add_item(item, lst=[])` considered dangerous in Python?",
        "options": [
            "It raises a SyntaxError at compile time",
            "The default list is instantiated only once at function definition time, sharing the mutated state across subsequent calls",
            "Python does not support list arguments in functions",
            "The list will be wiped out automatically after the first invocation"
        ],
        "correct": 1,
        "explanation": "Default arguments are evaluated once when the function is defined. A mutable default like [] persists modifications across subsequent calls."
    },
    {
        "id": "py-q09",
        "subject": "Python",
        "topic": "Lists",
        "difficulty": "Easy",
        "question": "What is the output of the list comprehension `[x**2 for x in range(5) if x % 2 != 0]`?",
        "options": [
            "[0, 4, 16]",
            "[1, 9]",
            "[1, 9, 25]",
            "[1, 4, 9]"
        ],
        "correct": 1,
        "explanation": "range(5) produces 0, 1, 2, 3, 4. Odd numbers are 1 and 3. Squaring them yields [1, 9]."
    },
    {
        "id": "py-q10",
        "subject": "Python",
        "topic": "Tuples",
        "difficulty": "Medium",
        "question": "How do you create a valid single-element tuple containing the integer 42?",
        "options": [
            "(42)",
            "[42]",
            "(42,)",
            "tuple(42)"
        ],
        "correct": 2,
        "explanation": "In Python, parentheses alone do not create a tuple without a comma. A single-element tuple requires a trailing comma: `(42,)`."
    },
    {
        "id": "py-q11",
        "subject": "Python",
        "topic": "Sets",
        "difficulty": "Easy",
        "question": "How do you instantiate an EMPTY set in Python?",
        "options": [
            "{}",
            "set()",
            "[]",
            "set({})"
        ],
        "correct": 1,
        "explanation": "`{}` creates an empty dictionary. An empty set must be instantiated using `set()`."
    },
    {
        "id": "py-q12",
        "subject": "Python",
        "topic": "Dictionaries",
        "difficulty": "Medium",
        "question": "What happens when you execute `d['missing_key']` on a standard dictionary `d` that lacks that key?",
        "options": [
            "It returns None",
            "It returns 0",
            "It raises a KeyError",
            "It creates the key automatically with an empty value"
        ],
        "correct": 2,
        "explanation": "Direct bracket indexing on a missing key raises a KeyError. Use `d.get('missing_key', default)` to return a fallback value safely."
    },
    {
        "id": "py-q13",
        "subject": "Python",
        "topic": "Strings",
        "difficulty": "Easy",
        "question": "What does the slice expression `text[::-1]` perform on a string `text` in Python?",
        "options": [
            "Returns every second character of text",
            "Deletes the first and last characters",
            "Reverses the entire string",
            "Converts the string into uppercase"
        ],
        "correct": 2,
        "explanation": "`text[::-1]` steps through the string backward with a step of -1, producing a reversed string."
    },
    {
        "id": "py-q14",
        "subject": "Python",
        "topic": "Exception Handling",
        "difficulty": "Hard",
        "question": "In a Python try-except-else-finally construct, when does the 'finally' block execute?",
        "options": [
            "Only if an unhandled exception occurred",
            "Only if no exception occurred in the try block",
            "Always, regardless of whether an exception occurred or if return/break was called",
            "Only if the except block completed without errors"
        ],
        "correct": 2,
        "explanation": "The `finally` block is guaranteed to execute unconditionally, even if `return`, `break`, or an unhandled exception occurs."
    },
    {
        "id": "py-q15",
        "subject": "Python",
        "topic": "Object-Oriented Programming",
        "difficulty": "Hard",
        "question": "What mechanism does Python use to simulate private attributes when prefixed with double underscores (e.g. `__secret`)?",
        "options": [
            "Strict memory hardware encapsulation",
            "Name Mangling, transforming `__secret` to `_ClassName__secret`",
            "Generating runtime AccessDenied exceptions",
            "Making attributes read-only"
        ],
        "correct": 1,
        "explanation": "Double leading underscores trigger name mangling in Python, transforming `__secret` to `_ClassName__secret` to prevent accidental subclass overrides."
    },
    {
        "id": "py-q16",
        "subject": "Python",
        "topic": "File Handling",
        "difficulty": "Medium",
        "question": "What is the primary benefit of using `with open('file.txt', 'r') as f:` over raw `f = open('file.txt', 'r')`?",
        "options": [
            "It runs file reading on a multi-threaded background process",
            "It automatically closes the file descriptor even if an error is raised inside the block",
            "It grants administrative write permissions to the file",
            "It compresses the file on disk during reading"
        ],
        "correct": 1,
        "explanation": "The `with` statement utilizes the context manager protocol, ensuring deterministic resource cleanup and closure even upon exceptions."
    },

    # =========================================================================
    # MACHINE LEARNING (21 Questions)
    # =========================================================================
    {
        "id": "ml-q01",
        "subject": "Machine Learning",
        "topic": "Introduction to Machine Learning",
        "difficulty": "Easy",
        "question": "According to Tom Mitchell, a machine learning program improves its performance P on task T through what?",
        "options": [
            "Manual code refactoring",
            "Experience E",
            "Faster CPU clocks",
            "Bigger hard drives"
        ],
        "correct": 1,
        "explanation": "Tom Mitchell formally defined ML: 'A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.'"
    },
    {
        "id": "ml-q02",
        "subject": "Machine Learning",
        "topic": "Types of Machine Learning",
        "difficulty": "Easy",
        "question": "Which type of machine learning operates on data that DOES NOT have target output labels?",
        "options": [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Transfer Learning"
        ],
        "correct": 1,
        "explanation": "Unsupervised learning discovers latent patterns, groupings, and structures from unlabeled feature data without target labels."
    },
    {
        "id": "ml-q03",
        "subject": "Machine Learning",
        "topic": "Supervised Learning",
        "difficulty": "Easy",
        "question": "Predicting whether a bank customer will default on a loan (Default vs No Default) is an example of what task?",
        "options": [
            "Regression",
            "Clustering",
            "Binary Classification",
            "Dimensionality Reduction"
        ],
        "correct": 2,
        "explanation": "Predicting between two discrete categorical outcomes (Default / No Default) is a binary classification task."
    },
    {
        "id": "ml-q04",
        "subject": "Machine Learning",
        "topic": "Regression",
        "difficulty": "Easy",
        "question": "Which of the following loss functions is most commonly minimized in Ordinary Least Squares (OLS) Linear Regression?",
        "options": [
            "Cross-Entropy Loss",
            "Mean Squared Error (MSE)",
            "Gini Impurity",
            "Hinge Loss"
        ],
        "correct": 1,
        "explanation": "Linear regression traditionally minimizes the Mean Squared Error (MSE) / residual sum of squares between predicted and true continuous values."
    },
    {
        "id": "ml-q05",
        "subject": "Machine Learning",
        "topic": "Decision Tree",
        "difficulty": "Medium",
        "question": "What metric represents the reduction in entropy achieved by partitioning a dataset on an attribute in a Decision Tree?",
        "options": [
            "Gini Index",
            "Information Gain",
            "Variance Ratio",
            "R-squared"
        ],
        "correct": 1,
        "explanation": "Information Gain measures the reduction in Shannon Entropy after splitting a dataset based on an attribute."
    },
    {
        "id": "ml-q06",
        "subject": "Machine Learning",
        "topic": "kNN",
        "difficulty": "Medium",
        "question": "Why is the k-Nearest Neighbors (kNN) algorithm commonly characterized as a 'lazy learner'?",
        "options": [
            "It runs extremely slowly during training",
            "It does not construct a generalized internal model during training, deferring computations until query time",
            "It only accepts small datasets with under 100 rows",
            "It uses random guesses when distance calculations fail"
        ],
        "correct": 1,
        "explanation": "kNN is called an instance-based or lazy learner because it simply memorizes the training data and performs computations only when evaluating test queries."
    },
    {
        "id": "ml-q07",
        "subject": "Machine Learning",
        "topic": "Naive Bayes",
        "difficulty": "Medium",
        "question": "What is the central 'naive' assumption made by the Naive Bayes classifier?",
        "options": [
            "All classes have exactly the same number of samples",
            "All input features are conditionally independent of each other given the class label",
            "The error follows a uniform distribution",
            "Data points are non-linearly separable"
        ],
        "correct": 1,
        "explanation": "Naive Bayes assumes that all feature attributes are conditionally independent of each other given the class label, simplifying joint probability computations."
    },
    {
        "id": "ml-q08",
        "subject": "Machine Learning",
        "topic": "SVM",
        "difficulty": "Hard",
        "question": "In Support Vector Machines, what are 'Support Vectors'?",
        "options": [
            "The hyperparameters used to control regularized learning rate",
            "The data points that lie closest to the decision boundary and determine the position and margin of the optimal hyperplane",
            "All points that are misclassified during gradient descent",
            "The synthetic features created during PCA transformation"
        ],
        "correct": 1,
        "explanation": "Support vectors are the critical data points lying directly on or closest to the margin boundaries that dictate the orientation of the separating hyperplane."
    },
    {
        "id": "ml-q09",
        "subject": "Machine Learning",
        "topic": "SVM",
        "difficulty": "Hard",
        "question": "What does the 'Kernel Trick' allow a Support Vector Machine to accomplish?",
        "options": [
            "Compress text data without loss of vocabulary",
            "Map non-linearly separable input data into a higher-dimensional space where it becomes linearly separable without computing explicit coordinates",
            "Solve classification problems using rule-based decision heuristics",
            "Eliminate all support vectors to reduce memory consumption"
        ],
        "correct": 1,
        "explanation": "The kernel trick computes inner products in high-dimensional Hilbert spaces directly from low-dimensional inputs, enabling non-linear classification without explicit coordinate transformations."
    },
    {
        "id": "ml-q10",
        "subject": "Machine Learning",
        "topic": "Overfitting",
        "difficulty": "Medium",
        "question": "A model exhibits 99% accuracy on the training set but only 52% accuracy on the test set. What problem is this model experiencing?",
        "options": [
            "Underfitting",
            "Overfitting (High Variance)",
            "High Bias",
            "Data leakage"
        ],
        "correct": 1,
        "explanation": "High training performance combined with poor generalization on unseen test data is the hallmark of overfitting (low bias, high variance)."
    },
    {
        "id": "ml-q11",
        "subject": "Machine Learning",
        "topic": "Underfitting",
        "difficulty": "Medium",
        "question": "Which of the following interventions is effective for overcoming UNDERFITTING in a machine learning model?",
        "options": [
            "Increasing regularization strength (higher L2 penalty)",
            "Reducing model complexity by pruning",
            "Adding more polynomial features and increasing model capacity",
            "Dropping half of the informative training features"
        ],
        "correct": 2,
        "explanation": "Underfitting indicates high bias. Increasing model capacity, adding polynomial/interaction features, and reducing excessive regularization alleviate underfitting."
    },
    {
        "id": "ml-q12",
        "subject": "Machine Learning",
        "topic": "Feature Engineering",
        "difficulty": "Medium",
        "question": "Why is Standard Z-Score Scaling ($z = (x - \\mu) / \\sigma$) critical for distance-based algorithms like kNN and SVM?",
        "options": [
            "It turns categorical text labels into numerical indices",
            "It prevents features with large numeric magnitudes from dominating the distance metrics",
            "It removes all missing values automatically",
            "It converts non-linear boundaries into decision trees"
        ],
        "correct": 1,
        "explanation": "Distance-based models compute Euclidean distances. Unscaled features with large numerical ranges (e.g. Salary in thousands) overwhelm smaller-range features (e.g. Age)."
    },
    {
        "id": "ml-q13",
        "subject": "Machine Learning",
        "topic": "Data Preprocessing",
        "difficulty": "Hard",
        "question": "What is 'Data Leakage' in a machine learning pipeline?",
        "options": [
            "When database passwords are leaked in open-source repositories",
            "When information from outside the training dataset (such as test or future data) inadvertently influences model training",
            "When memory overflows due to excessively large datasets",
            "When categorical variables have too many distinct categories"
        ],
        "correct": 1,
        "explanation": "Data leakage occurs when test/validation data influences training (e.g. fitting a scaler on the entire dataset before splitting), resulting in unrealistically high validation metrics."
    },
    {
        "id": "ml-q14",
        "subject": "Machine Learning",
        "topic": "Cross Validation",
        "difficulty": "Medium",
        "question": "In 5-Fold Cross Validation, how many total times is the model trained and evaluated?",
        "options": [
            "1 time",
            "5 times",
            "25 times",
            "10 times"
        ],
        "correct": 1,
        "explanation": "In k-Fold CV, the dataset is divided into k partitions. The model is trained and evaluated k times (5 times in 5-fold CV), with each fold serving as the test set once."
    },
    {
        "id": "ml-q15",
        "subject": "Machine Learning",
        "topic": "Confusion Matrix",
        "difficulty": "Medium",
        "question": "In binary classification, what is a False Positive (Type I Error)?",
        "options": [
            "A positive sample correctly predicted as positive",
            "A negative sample correctly predicted as negative",
            "A negative sample incorrectly predicted as positive",
            "A positive sample incorrectly predicted as negative"
        ],
        "correct": 2,
        "explanation": "A False Positive occurs when the model predicts positive for an actual negative instance (e.g. flagging a legitimate email as spam)."
    },
    {
        "id": "ml-q16",
        "subject": "Machine Learning",
        "topic": "Confusion Matrix",
        "difficulty": "Hard",
        "question": "Which evaluation metric is defined as $TP / (TP + FN)$, measuring the model's ability to locate all actual positive cases?",
        "options": [
            "Precision",
            "Recall (Sensitivity)",
            "Specificity",
            "Accuracy"
        ],
        "correct": 1,
        "explanation": "Recall (or Sensitivity) is $TP / (TP + FN)$, measuring the fraction of actual positive instances successfully identified by the classifier."
    },
    {
        "id": "ml-q17",
        "subject": "Machine Learning",
        "topic": "Confusion Matrix",
        "difficulty": "Medium",
        "question": "What is the F1-Score?",
        "options": [
            "The arithmetic mean of accuracy and error rate",
            "The harmonic mean of Precision and Recall",
            "The difference between True Positives and False Positives",
            "The geometric mean of Sensitivity and Specificity"
        ],
        "correct": 1,
        "explanation": "F1-Score is the harmonic mean of Precision and Recall: $2 \\cdot (Precision \\cdot Recall) / (Precision + Recall)$."
    },
    {
        "id": "ml-q18",
        "subject": "Machine Learning",
        "topic": "Clustering",
        "difficulty": "Medium",
        "question": "What heuristic graphical technique is commonly used to choose the optimal number of clusters $k$ in k-Means clustering?",
        "options": [
            "The Elbow Method",
            "ROC Curve",
            "Residual Plot",
            "Scree test for p-values"
        ],
        "correct": 0,
        "explanation": "The Elbow Method plots within-cluster sum of squares (inertia) against $k$; the point where inertia decrease slows dramatically ('elbow') indicates a suitable $k$."
    },
    {
        "id": "ml-q19",
        "subject": "Machine Learning",
        "topic": "Clustering",
        "difficulty": "Hard",
        "question": "What is a key advantage of DBSCAN clustering over standard k-Means?",
        "options": [
            "DBSCAN requires users to pre-specify the exact number of clusters",
            "DBSCAN can find arbitrarily shaped clusters and explicitly identifies noise points / outliers",
            "DBSCAN runs in linear O(1) time regardless of dataset size",
            "DBSCAN only works on 1-dimensional datasets"
        ],
        "correct": 1,
        "explanation": "DBSCAN is density-based; it discovers non-spherical clusters of arbitrary geometry and flags sparse points as noise/outliers without requiring a preset $k$."
    },
    {
        "id": "ml-q20",
        "subject": "Machine Learning",
        "topic": "Reinforcement Learning",
        "difficulty": "Hard",
        "question": "In Reinforcement Learning, what dilemma describes balancing between trying untested actions vs picking known rewarding actions?",
        "options": [
            "Bias vs Variance dilemma",
            "Exploration vs Exploitation dilemma",
            "Supervised vs Unsupervised dilemma",
            "Accuracy vs Interpretability trade-off"
        ],
        "correct": 1,
        "explanation": "The Exploration vs Exploitation dilemma requires an RL agent to balance gathering new environmental data (exploration) with capitalizing on known rewards (exploitation)."
    },
    {
        "id": "ml-q21",
        "subject": "Machine Learning",
        "topic": "Reinforcement Learning",
        "difficulty": "Medium",
        "question": "What mathematical framework is standardly used to formalize sequential decision making in Reinforcement Learning?",
        "options": [
            "Markov Decision Process (MDP)",
            "Ordinary Differential Equations",
            "Euclidean Distance Metric",
            "Linear Discriminant Analysis"
        ],
        "correct": 0,
        "explanation": "A Markov Decision Process (MDP) mathematically models discrete-time stochastic control processes defined by States, Actions, Transitions, and Rewards."
    },

    # =========================================================================
    # ARTIFICIAL INTELLIGENCE (16 Questions)
    # =========================================================================
    {
        "id": "ai-q01",
        "subject": "Artificial Intelligence",
        "topic": "Introduction to AI",
        "difficulty": "Easy",
        "question": "At which historic conference in 1956 was the term 'Artificial Intelligence' formally coined by John McCarthy?",
        "options": [
            "The Turing Symposium",
            "The Dartmouth Summer Research Project",
            "The IEEE International Computer Conference",
            "The Bell Labs Workshop"
        ],
        "correct": 1,
        "explanation": "John McCarthy organized the 1956 Dartmouth Summer Research Project on Artificial Intelligence, formally founding AI as a discipline."
    },
    {
        "id": "ai-q02",
        "subject": "Artificial Intelligence",
        "topic": "Strong AI vs Weak AI",
        "difficulty": "Easy",
        "question": "Which category of AI describes all real-world commercial AI applications operational today (e.g. Siri, AlphaGo)?",
        "options": [
            "Strong AI (AGI)",
            "Artificial Superintelligence (ASI)",
            "Weak AI (Narrow AI)",
            "Sentient AI"
        ],
        "correct": 2,
        "explanation": "All currently deployed AI systems are Weak (or Narrow) AI, designed to perform dedicated specialized tasks without generalized consciousness."
    },
    {
        "id": "ai-q03",
        "subject": "Artificial Intelligence",
        "topic": "Turing Test",
        "difficulty": "Easy",
        "question": "In Alan Turing's 1950 Imitation Game, what is the role of the human interrogator?",
        "options": [
            "To inspect the machine's source code for algorithmic bugs",
            "To converse via text with an unseen human and machine to determine which respondent is the computer",
            "To measure the power consumption and clock speed of the hardware",
            "To verify whether the computer exhibits biometric vital signs"
        ],
        "correct": 1,
        "explanation": "The interrogator converses in blind text-based sessions with a human and machine, trying to determine which participant is the computer."
    },
    {
        "id": "ai-q04",
        "subject": "Artificial Intelligence",
        "topic": "Intelligent Agents",
        "difficulty": "Medium",
        "question": "What does the PEAS acronym stand for in Intelligent Agent design?",
        "options": [
            "Program, Execution, Action, Strategy",
            "Performance measure, Environment, Actuators, Sensors",
            "Perception, Energy, Architecture, Speed",
            "Planning, Evaluation, Accuracy, State"
        ],
        "correct": 1,
        "explanation": "PEAS characterizes an agent's task environment: Performance measure, Environment, Actuators, and Sensors."
    },
    {
        "id": "ai-q05",
        "subject": "Artificial Intelligence",
        "topic": "Intelligent Agents",
        "difficulty": "Medium",
        "question": "An environment where an agent's sensors give complete access to the entire state of the environment at each point in time is termed:",
        "options": [
            "Partially observable",
            "Fully observable",
            "Stochastic",
            "Continuous"
        ],
        "correct": 1,
        "explanation": "A fully observable environment allows an agent's sensors to detect all aspects relevant to selecting the optimal action."
    },
    {
        "id": "ai-q06",
        "subject": "Artificial Intelligence",
        "topic": "BFS",
        "difficulty": "Easy",
        "question": "Which data structure is fundamentally utilized to implement Breadth-First Search (BFS)?",
        "options": [
            "LIFO Stack",
            "FIFO Queue",
            "Priority Heap",
            "Binary Search Tree"
        ],
        "correct": 1,
        "explanation": "BFS uses a First-In, First-Out (FIFO) queue to explore nodes level-by-level."
    },
    {
        "id": "ai-q07",
        "subject": "Artificial Intelligence",
        "topic": "BFS",
        "difficulty": "Hard",
        "question": "What is the primary practical limitation of Breadth-First Search (BFS) in large state spaces?",
        "options": [
            "It is incomplete and can never find a goal",
            "Exponential space complexity $O(b^d)$, quickly exhausting memory",
            "It cannot be implemented with recursion",
            "It always finds suboptimal paths"
        ],
        "correct": 1,
        "explanation": "Because BFS retains all frontier nodes at the current depth in memory, its $O(b^d)$ space complexity exhausts RAM before CPU time limits are reached."
    },
    {
        "id": "ai-q08",
        "subject": "Artificial Intelligence",
        "topic": "DFS",
        "difficulty": "Medium",
        "question": "What is the space complexity of Depth-First Search (DFS) where $b$ is the branching factor and $m$ is the maximum search depth?",
        "options": [
            "$O(b^m)$",
            "$O(b \\cdot m)$",
            "$O(m^2)$",
            "$O(1)$"
        ],
        "correct": 1,
        "explanation": "DFS only needs to store the single path from the root to the current node along with remaining sibling nodes, yielding linear space complexity $O(bm)$."
    },
    {
        "id": "ai-q09",
        "subject": "Artificial Intelligence",
        "topic": "A* Search",
        "difficulty": "Hard",
        "question": "What condition must a heuristic function $h(n)$ satisfy to guarantee that A* Tree Search returns an OPTIMAL path?",
        "options": [
            "It must be overestimating ($h(n) > h^*(n)$)",
            "It must be admissible ($h(n) \\le h^*(n)$), never overestimating true cost to goal",
            "It must equal zero for all non-terminal nodes",
            "It must be negative"
        ],
        "correct": 1,
        "explanation": "An admissible heuristic never overestimates the true remaining cost to reach the goal, which mathematically guarantees A* tree search optimality."
    },
    {
        "id": "ai-q10",
        "subject": "Artificial Intelligence",
        "topic": "A* Search",
        "difficulty": "Medium",
        "question": "In the A* evaluation function $f(n) = g(n) + h(n)$, what does $g(n)$ represent?",
        "options": [
            "The estimated heuristic cost from node n to the goal",
            "The exact cost incurred so far to reach node n from the start node",
            "The depth of the search tree",
            "The branching factor at node n"
        ],
        "correct": 1,
        "explanation": "$g(n)$ represents the exact path cost accumulated from the initial start state to node $n$."
    },
    {
        "id": "ai-q11",
        "subject": "Artificial Intelligence",
        "topic": "Hill Climbing",
        "difficulty": "Medium",
        "question": "What is the primary drawback of standard Greedy Hill Climbing search?",
        "options": [
            "It requires exponential memory storage",
            "It can get trapped in Local Maxima, Plateaus, and Ridges",
            "It cannot solve optimization problems",
            "It requires an admissible heuristic function"
        ],
        "correct": 1,
        "explanation": "Because hill climbing only considers immediate local improvements, it gets trapped on local peaks that are lower than the global optimum."
    },
    {
        "id": "ai-q12",
        "subject": "Artificial Intelligence",
        "topic": "Knowledge Representation",
        "difficulty": "Medium",
        "question": "In First-Order Logic (FOL), which symbols represent 'Universal' and 'Existential' quantifiers?",
        "options": [
            "& and |",
            "$\\forall$ (for all) and $\\exists$ (there exists)",
            "$\\implies$ and $\\iff$",
            "NOT and EQUAL"
        ],
        "correct": 1,
        "explanation": "$\\forall$ is the universal quantifier ('for all'), and $\\exists$ is the existential quantifier ('there exists')."
    },
    {
        "id": "ai-q13",
        "subject": "Artificial Intelligence",
        "topic": "Expert Systems",
        "difficulty": "Easy",
        "question": "What are the two core architectural components decoupled in an Expert System?",
        "options": [
            "HTML layout and CSS stylesheets",
            "Knowledge Base and Inference Engine",
            "Compiler and Linker",
            "RAM and Hard Drive"
        ],
        "correct": 1,
        "explanation": "Expert systems distinctly decouple the Knowledge Base (domain rules) from the Inference Engine (reasoning algorithms)."
    },
    {
        "id": "ai-q14",
        "subject": "Artificial Intelligence",
        "topic": "NLP",
        "difficulty": "Medium",
        "question": "What is the key difference between Stemming and Lemmatization in NLP text preprocessing?",
        "options": [
            "Stemming converts words to numbers, while lemmatization converts numbers to words",
            "Stemming chops word affixes heuristically (often producing non-words), whereas lemmatization uses vocabulary and morphological rules to return genuine dictionary lemmas",
            "Lemmatization is only used for audio signals",
            "Stemming is much slower than lemmatization"
        ],
        "correct": 1,
        "explanation": "Stemming crudely strips suffixes (e.g., 'studies' -> 'studi'), whereas lemmatization analyzes morphology to yield valid dictionary words (e.g., 'studies' -> 'study')."
    },
    {
        "id": "ai-q15",
        "subject": "Artificial Intelligence",
        "topic": "Game Playing",
        "difficulty": "Hard",
        "question": "In the Minimax algorithm with Alpha-Beta pruning, what occurs when $\\alpha \\ge \\beta$?",
        "options": [
            "The game terminates in a draw",
            "The remaining sibling branches of the current node are pruned because they cannot affect the final decision",
            "The evaluation function throws an exception",
            "The search depth is doubled"
        ],
        "correct": 1,
        "explanation": "When $\\alpha \\ge \\beta$, a cutoff occurs: the current branch is guaranteed to be worse than an alternative already available, so remaining siblings are safely pruned."
    },
    {
        "id": "ai-q16",
        "subject": "Artificial Intelligence",
        "topic": "Game Playing",
        "difficulty": "Medium",
        "question": "In adversarial search, a 'Zero-Sum Game' implies what relationship between players?",
        "options": [
            "Both players always receive zero points",
            "One player's gain is exactly equal to the opposing player's loss",
            "Players cooperate to maximize a combined total reward",
            "The game cannot end until all pieces are removed"
        ],
        "correct": 1,
        "explanation": "In a zero-sum game, total utility is constant: any payoff gained by one player is exactly subtracted from the opponent's payoff."
    },

    # =========================================================================
    # DBMS (21 Questions)
    # =========================================================================
    {
        "id": "db-q01",
        "subject": "DBMS",
        "topic": "Introduction to DBMS",
        "difficulty": "Easy",
        "question": "What does the ACID acronym stand for in database transaction processing?",
        "options": [
            "Accuracy, Consistency, Integrity, Durability",
            "Atomicity, Consistency, Isolation, Durability",
            "Authentication, Control, Indexing, Delivery",
            "Allocation, Concurrency, Isolation, Deletion"
        ],
        "correct": 1,
        "explanation": "ACID guarantees transactional reliability: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrency), and Durability (persistence)."
    },
    {
        "id": "db-q02",
        "subject": "DBMS",
        "topic": "Introduction to DBMS",
        "difficulty": "Medium",
        "question": "What property allows modification of the physical database storage structure without altering conceptual schemas or application programs?",
        "options": [
            "Logical Data Independence",
            "Physical Data Independence",
            "Referential Integrity",
            "Cascading Deletion"
        ],
        "correct": 1,
        "explanation": "Physical Data Independence is the capacity to alter physical storage devices or access paths without modifying the conceptual schema."
    },
    {
        "id": "db-q03",
        "subject": "DBMS",
        "topic": "DBMS vs RDBMS",
        "difficulty": "Easy",
        "question": "Who formulated the relational database model and the famous 12 Relational Rules in 1970?",
        "options": [
            "Alan Turing",
            "Edgar F. Codd (E.F. Codd)",
            "Charles Bachman",
            "Peter Chen"
        ],
        "correct": 1,
        "explanation": "Dr. Edgar F. Codd introduced the relational model and Codd's 12 rules while working at IBM in 1970."
    },
    {
        "id": "db-q04",
        "subject": "DBMS",
        "topic": "Keys",
        "difficulty": "Medium",
        "question": "What is the technical definition of a Candidate Key in relational database theory?",
        "options": [
            "Any column that contains numerical values",
            "A minimal Super Key that contains no redundant attributes",
            "A foreign key that points to a candidate table",
            "A key that allows duplicate values"
        ],
        "correct": 1,
        "explanation": "A Candidate Key is formally defined as a minimal super key; removing any attribute from it destroys its uniqueness property."
    },
    {
        "id": "db-q05",
        "subject": "DBMS",
        "topic": "Primary Key",
        "difficulty": "Easy",
        "question": "Which two constraints are automatically enforced on any column defined as a PRIMARY KEY?",
        "options": [
            "CHECK and DEFAULT",
            "UNIQUE and NOT NULL",
            "FOREIGN KEY and CASCADE",
            "AUTO_INCREMENT and BINARY"
        ],
        "correct": 1,
        "explanation": "A Primary Key uniquely identifies rows and enforces Entity Integrity, implicitly combining `UNIQUE` and `NOT NULL` constraints."
    },
    {
        "id": "db-q06",
        "subject": "DBMS",
        "topic": "Foreign Key",
        "difficulty": "Easy",
        "question": "Which database integrity rule is enforced by Foreign Keys?",
        "options": [
            "Entity Integrity",
            "Referential Integrity",
            "Domain Integrity",
            "User-defined Integrity"
        ],
        "correct": 1,
        "explanation": "Foreign keys enforce Referential Integrity, ensuring references from child tables match valid primary key values in parent tables."
    },
    {
        "id": "db-q07",
        "subject": "DBMS",
        "topic": "Foreign Key",
        "difficulty": "Medium",
        "question": "What occurs when a referenced parent row is deleted and the foreign key has `ON DELETE CASCADE` configured?",
        "options": [
            "The deletion is blocked and throws an error",
            "The referencing child rows are automatically deleted as well",
            "The referencing foreign key column is populated with NULL",
            "The database server restarts"
        ],
        "correct": 1,
        "explanation": "`ON DELETE CASCADE` automatically purges child table rows referencing the deleted parent primary key."
    },
    {
        "id": "db-q08",
        "subject": "DBMS",
        "topic": "Constraints",
        "difficulty": "Easy",
        "question": "Which SQL constraint ensures that all values inserted into a column satisfy a custom boolean condition (e.g. `age >= 18`)?",
        "options": [
            "DEFAULT",
            "CHECK",
            "UNIQUE",
            "PRIMARY KEY"
        ],
        "correct": 1,
        "explanation": "The `CHECK` constraint tests inserted or updated values against a specified boolean expression."
    },
    {
        "id": "db-q09",
        "subject": "DBMS",
        "topic": "SQL",
        "difficulty": "Easy",
        "question": "Which sub-language of SQL includes statements like CREATE, ALTER, and DROP?",
        "options": [
            "DML (Data Manipulation Language)",
            "DDL (Data Definition Language)",
            "DCL (Data Control Language)",
            "TCL (Transaction Control Language)"
        ],
        "correct": 1,
        "explanation": "DDL (Data Definition Language) commands define and alter the structure/schema of database objects."
    },
    {
        "id": "db-q10",
        "subject": "DBMS",
        "topic": "SELECT",
        "difficulty": "Medium",
        "question": "What is the conceptual execution order of clauses in an SQL query containing WHERE, HAVING, GROUP BY, and FROM?",
        "options": [
            "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING",
            "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT",
            "WHERE -> FROM -> GROUP BY -> HAVING -> SELECT",
            "FROM -> GROUP BY -> WHERE -> HAVING -> SELECT"
        ],
        "correct": 1,
        "explanation": "SQL logically processes clauses in order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
    },
    {
        "id": "db-q11",
        "subject": "DBMS",
        "topic": "SELECT",
        "difficulty": "Medium",
        "question": "What is the crucial operational distinction between the WHERE clause and the HAVING clause in SQL?",
        "options": [
            "WHERE filters rows before grouping; HAVING filters aggregated groups after GROUP BY",
            "WHERE only works with numbers; HAVING works with strings",
            "HAVING filters individual rows; WHERE filters aggregated groups",
            "They are completely interchangeable"
        ],
        "correct": 0,
        "explanation": "`WHERE` filters base rows before any grouping is performed; `HAVING` filters aggregate group results after `GROUP BY`."
    },
    {
        "id": "db-q12",
        "subject": "DBMS",
        "topic": "INSERT, UPDATE, DELETE",
        "difficulty": "Medium",
        "question": "How does `TRUNCATE TABLE` differ from `DELETE FROM table`?",
        "options": [
            "TRUNCATE deletes the table schema entirely, while DELETE keeps the schema",
            "TRUNCATE is a DDL operation that resets high-water marks and is faster, while DELETE is a logged DML operation that deletes rows one-by-one",
            "DELETE is faster than TRUNCATE",
            "TRUNCATE allows a WHERE clause to filter specific rows"
        ],
        "correct": 1,
        "explanation": "TRUNCATE is DDL, deallocates data pages rapidly with minimal logging, and cannot accept a WHERE clause, unlike row-by-row logged DML DELETE."
    },
    {
        "id": "db-q13",
        "subject": "DBMS",
        "topic": "Joins",
        "difficulty": "Easy",
        "question": "Which type of JOIN returns only the rows that have matching values in BOTH joined tables?",
        "options": [
            "LEFT OUTER JOIN",
            "INNER JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN"
        ],
        "correct": 1,
        "explanation": "An INNER JOIN selects records that have matching values in both tables based on the join predicate."
    },
    {
        "id": "db-q14",
        "subject": "DBMS",
        "topic": "Joins",
        "difficulty": "Medium",
        "question": "If Table A contains 5 rows and Table B contains 4 rows, how many rows are produced by a CROSS JOIN of A and B?",
        "options": [
            "9 rows",
            "20 rows",
            "5 rows",
            "1 row"
        ],
        "correct": 1,
        "explanation": "A CROSS JOIN produces the Cartesian product of the two tables: $5 \\times 4 = 20$ rows."
    },
    {
        "id": "db-q15",
        "subject": "DBMS",
        "topic": "Subqueries",
        "difficulty": "Hard",
        "question": "What characterizes a CORRELATED subquery in SQL?",
        "options": [
            "It executes only once before the outer query runs",
            "It references columns from the outer query table, requiring evaluation once for every row processed by the outer query",
            "It cannot contain aggregate functions",
            "It is executed on a remote backup server"
        ],
        "correct": 1,
        "explanation": "A correlated subquery references values in the outer query, re-evaluating for each row processed by the outer query."
    },
    {
        "id": "db-q16",
        "subject": "DBMS",
        "topic": "Normalization",
        "difficulty": "Easy",
        "question": "What are the three primary database anomalies that Normalization aims to eliminate?",
        "options": [
            "Syntax, Runtime, and Logical errors",
            "Insertion, Deletion, and Update (Modification) anomalies",
            "Hardware, Network, and Power anomalies",
            "Locking, Deadlock, and Livelock anomalies"
        ],
        "correct": 1,
        "explanation": "Normalization eliminates redundancy to prevent Insertion, Deletion, and Modification/Update anomalies."
    },
    {
        "id": "db-q17",
        "subject": "DBMS",
        "topic": "1NF",
        "difficulty": "Easy",
        "question": "A relation is in First Normal Form (1NF) if and only if:",
        "options": [
            "All non-key attributes are fully dependent on the primary key",
            "All attribute values are atomic and there are no repeating groups",
            "It contains no transitive dependencies",
            "Every determinant is a candidate key"
        ],
        "correct": 1,
        "explanation": "1NF requires that all column values be atomic (indivisible) and that no repeating groups or multi-valued lists exist."
    },
    {
        "id": "db-q18",
        "subject": "DBMS",
        "topic": "2NF",
        "difficulty": "Medium",
        "question": "What type of dependency is specifically prohibited in Second Normal Form (2NF)?",
        "options": [
            "Transitive Dependency",
            "Partial Dependency (a non-prime attribute depending on part of a composite key)",
            "Multi-valued Dependency",
            "Trivial Dependency"
        ],
        "correct": 1,
        "explanation": "2NF requires 1NF and mandates that no non-prime attribute be partially dependent on a proper subset of any candidate key."
    },
    {
        "id": "db-q19",
        "subject": "DBMS",
        "topic": "3NF",
        "difficulty": "Medium",
        "question": "A relation is in Third Normal Form (3NF) if it is in 2NF and has NO:",
        "options": [
            "Primary keys",
            "Transitive Dependencies",
            "Atomic values",
            "Foreign keys"
        ],
        "correct": 1,
        "explanation": "3NF requires that no non-prime attribute depends transitively on a candidate key ($X \\to Y \\to Z$)."
    },
    {
        "id": "db-q20",
        "subject": "DBMS",
        "topic": "BCNF",
        "difficulty": "Hard",
        "question": "In Boyce-Codd Normal Form (BCNF), what must be true for EVERY non-trivial functional dependency $X \\to Y$?",
        "options": [
            "Y must be a prime attribute",
            "X must strictly be a Super Key",
            "X and Y must be composite attributes",
            "The table must have only two columns"
        ],
        "correct": 1,
        "explanation": "BCNF requires that for every functional dependency $X \\to Y$, the determinant $X$ must strictly be a super key."
    },
    {
        "id": "db-q21",
        "subject": "DBMS",
        "topic": "Functional Dependency",
        "difficulty": "Hard",
        "question": "Which set of inferential axioms forms the sound and complete foundation for deriving functional dependencies in relational databases?",
        "options": [
            "Peano Axioms",
            "Armstrong's Axioms (Reflexivity, Augmentation, Transitivity)",
            "De Morgan's Laws",
            "Codd's Postulates"
        ],
        "correct": 1,
        "explanation": "William W. Armstrong developed Armstrong's Axioms in 1974, proving they are sound and complete for reasoning about functional dependencies."
    },

    # =========================================================================
    # DATA SCIENCE (16 Questions)
    # =========================================================================
    {
        "id": "ds-q01",
        "subject": "Data Science",
        "topic": "Introduction to Data Science",
        "difficulty": "Easy",
        "question": "According to Drew Conway's famous Venn diagram, Data Science lies at the intersection of which three disciplines?",
        "options": [
            "Physics, Chemistry, and Biology",
            "Hacking Skills, Math & Statistics Knowledge, and Substantive Domain Expertise",
            "Web Design, Database Administration, and Hardware Engineering",
            "Marketing, Sales, and Corporate Finance"
        ],
        "correct": 1,
        "explanation": "Drew Conway's Data Science Venn Diagram defines data science as the intersection of Hacking Skills, Math & Statistics Knowledge, and Substantive Expertise."
    },
    {
        "id": "ds-q02",
        "subject": "Data Science",
        "topic": "Data Collection",
        "difficulty": "Easy",
        "question": "Which data format is stored in a compressed columnar structure that optimizes analytical query performance on big data platforms?",
        "options": [
            "CSV",
            "Parquet",
            "JSON",
            "Plain Text"
        ],
        "correct": 1,
        "explanation": "Apache Parquet is an open-source columnar storage format that provides efficient compression and fast analytical query performance."
    },
    {
        "id": "ds-q03",
        "subject": "Data Science",
        "topic": "Data Cleaning",
        "difficulty": "Medium",
        "question": "Why is the MEDIAN generally preferred over the MEAN for imputing missing values in skewed datasets?",
        "options": [
            "The median is faster to compute on GPUs",
            "The median is robust against extreme outliers that distort the mean",
            "The median always returns an integer",
            "The mean cannot be computed if missing values exist"
        ],
        "correct": 1,
        "explanation": "Extreme outliers pull the mean toward the distribution tail, while the median remains stable because it is based on positional ranking."
    },
    {
        "id": "ds-q04",
        "subject": "Data Science",
        "topic": "Data Preprocessing",
        "difficulty": "Medium",
        "question": "What is the formula for Standard Z-Score Scaling of a feature $x$ with mean $\\mu$ and standard deviation $\\sigma$?",
        "options": [
            "$z = (x - x_{min}) / (x_{max} - x_{min})$",
            "$z = (x - \\mu) / \\sigma$",
            "$z = (x - \\mu)^2$",
            "$z = \\log(x)$"
        ],
        "correct": 1,
        "explanation": "Standardization computes $z = (x - \\mu) / \\sigma$, centering the feature with a mean of 0 and a standard deviation of 1."
    },
    {
        "id": "ds-q05",
        "subject": "Data Science",
        "topic": "EDA",
        "difficulty": "Easy",
        "question": "Who pioneered the field and visual philosophy of Exploratory Data Analysis (EDA) in 1977?",
        "options": [
            "Ronald Fisher",
            "John Tukey",
            "Karl Pearson",
            "Thomas Bayes"
        ],
        "correct": 1,
        "explanation": "John W. Tukey pioneered Exploratory Data Analysis (EDA) with his landmark 1977 book, championing graphical data inspection like the box plot."
    },
    {
        "id": "ds-q06",
        "subject": "Data Science",
        "topic": "EDA",
        "difficulty": "Medium",
        "question": "What five summary numbers are visualized in a standard Box-and-Whisker Plot?",
        "options": [
            "Mean, Mode, Median, Variance, Standard Deviation",
            "Minimum, First Quartile (Q1), Median (Q2), Third Quartile (Q3), Maximum",
            "P-value, Alpha, Beta, Confidence Interval, Sample Size",
            "True Positive, False Positive, True Negative, False Negative, Accuracy"
        ],
        "correct": 1,
        "explanation": "A box plot visualizes the 5-number summary: Minimum, Q1 (25th percentile), Median (50th percentile), Q3 (75th percentile), and Maximum."
    },
    {
        "id": "ds-q07",
        "subject": "Data Science",
        "topic": "Statistics",
        "difficulty": "Hard",
        "question": "What fundamental statistical theorem guarantees that the sampling distribution of sample means approaches a normal distribution as sample size grows large?",
        "options": [
            "Bayes' Theorem",
            "Central Limit Theorem",
            "Law of Large Numbers",
            "Markov Inequality"
        ],
        "correct": 1,
        "explanation": "The Central Limit Theorem (CLT) establishes that the distribution of sample means approximates a normal distribution as $n$ increases, regardless of population shape."
    },
    {
        "id": "ds-q08",
        "subject": "Data Science",
        "topic": "Mean",
        "difficulty": "Easy",
        "question": "What is the arithmetic mean of the dataset: [10, 20, 30, 40, 50]?",
        "options": [
            "25",
            "30",
            "35",
            "150"
        ],
        "correct": 1,
        "explanation": "Sum = 10 + 20 + 30 + 40 + 50 = 150. Count = 5. Mean = 150 / 5 = 30."
    },
    {
        "id": "ds-q09",
        "subject": "Data Science",
        "topic": "Median",
        "difficulty": "Easy",
        "question": "What is the median of the ordered dataset: [3, 7, 9, 15, 20, 24]?",
        "options": [
            "9",
            "12",
            "15",
            "13"
        ],
        "correct": 1,
        "explanation": "Because $n = 6$ (even), the median is the average of the 3rd and 4th values: $(9 + 15) / 2 = 24 / 2 = 12$."
    },
    {
        "id": "ds-q10",
        "subject": "Data Science",
        "topic": "Mode",
        "difficulty": "Easy",
        "question": "Which measure of central tendency is uniquely suitable for nominal categorical data (e.g. eye color)?",
        "options": [
            "Mean",
            "Mode",
            "Median",
            "Standard Deviation"
        ],
        "correct": 1,
        "explanation": "You cannot average or sort nominal categories mathematically, making the Mode (most frequent category) the only valid measure of central tendency."
    },
    {
        "id": "ds-q11",
        "subject": "Data Science",
        "topic": "Variance",
        "difficulty": "Hard",
        "question": "Why does the sample variance formula divide by $n - 1$ (Bessel's correction) rather than $n$?",
        "options": [
            "To make the calculation easier without decimals",
            "To correct the downward bias and provide an unbiased estimator of the true population variance",
            "Because one observation is always assumed to be corrupted",
            "To prevent division by zero when n = 0"
        ],
        "correct": 1,
        "explanation": "Dividing by $n-1$ compensates for estimating the population mean from sample data, eliminating downward bias to produce an unbiased variance estimate."
    },
    {
        "id": "ds-q12",
        "subject": "Data Science",
        "topic": "Standard Deviation",
        "difficulty": "Medium",
        "question": "According to the Empirical Rule (68-95-99.7 Rule), what percentage of data falls within $\\pm 2$ standard deviations of the mean in a normal distribution?",
        "options": [
            "Approximately 50%",
            "Approximately 68%",
            "Approximately 95%",
            "Approximately 99.7%"
        ],
        "correct": 2,
        "explanation": "In a Gaussian bell curve, approximately 68% falls within $\\pm 1\\sigma$, 95% falls within $\\pm 2\\sigma$, and 99.7% falls within $\\pm 3\\sigma$."
    },
    {
        "id": "ds-q13",
        "subject": "Data Science",
        "topic": "Data Visualization",
        "difficulty": "Hard",
        "question": "What does Anscombe's Quartet famously demonstrate to data scientists?",
        "options": [
            "That linear regression is always superior to neural networks",
            "That four datasets can have nearly identical summary statistics (mean, variance, correlation) yet display drastically different graphical distributions",
            "That 4-color maps are optimal for geographic visualizations",
            "That bar charts should never use color gradients"
        ],
        "correct": 1,
        "explanation": "Constructed by Francis Anscombe in 1973, Anscombe's Quartet shows why visualizing data is critical; identical numerical summaries can conceal wildly different structures."
    },
    {
        "id": "ds-q14",
        "subject": "Data Science",
        "topic": "Data Visualization",
        "difficulty": "Easy",
        "question": "Which Python visualization library is built directly on top of Matplotlib and specializes in high-level statistical plotting?",
        "options": [
            "NumPy",
            "Seaborn",
            "Flask",
            "TensorFlow"
        ],
        "correct": 1,
        "explanation": "Seaborn is a popular Python data visualization library based on Matplotlib that provides high-level interfaces for attractive statistical graphics."
    },
    {
        "id": "ds-q15",
        "subject": "Data Science",
        "topic": "Machine Learning in Data Science",
        "difficulty": "Medium",
        "question": "What phenomenon occurs when the statistical properties of the target variable or input features change over time in production?",
        "options": [
            "Concept Drift / Data Drift",
            "Gradient Explosion",
            "Deadlock",
            "Underflow"
        ],
        "correct": 0,
        "explanation": "Concept Drift refers to the decay of predictive performance caused by changes in underlying data distributions over time, necessitating model retraining."
    },
    {
        "id": "ds-q16",
        "subject": "Data Science",
        "topic": "EDA",
        "difficulty": "Medium",
        "question": "In statistical analysis, what does the correlation coefficient $r = -0.92$ indicate about two variables?",
        "options": [
            "A weak negative linear relationship",
            "A strong negative linear relationship (as one variable increases, the other decreases)",
            "No correlation between the variables",
            "That variable X causes variable Y"
        ],
        "correct": 1,
        "explanation": "A Pearson $r$ close to -1 indicates a strong negative linear correlation, meaning an increase in one feature strongly coincides with a decrease in the other."
    },

    # =========================================================================
    # COMPUTER NETWORKS (16 Questions)
    # =========================================================================
    {
        "id": "cn-q01",
        "subject": "Computer Networks",
        "topic": "Introduction to Computer Networks",
        "difficulty": "Easy",
        "question": "What fundamental switching paradigm forms the operational foundation of the modern Internet?",
        "options": [
            "Circuit Switching",
            "Packet Switching",
            "Message Switching",
            "Frequency Switching"
        ],
        "correct": 1,
        "explanation": "The Internet is built on packet switching, where data is split into independent packets routed through routers across shared channels."
    },
    {
        "id": "cn-q02",
        "subject": "Computer Networks",
        "topic": "LAN, MAN, WAN",
        "difficulty": "Easy",
        "question": "Which network classification spans a large geographical scale such as countries, continents, or the entire globe?",
        "options": [
            "PAN (Personal Area Network)",
            "LAN (Local Area Network)",
            "MAN (Metropolitan Area Network)",
            "WAN (Wide Area Network)"
        ],
        "correct": 3,
        "explanation": "A WAN (Wide Area Network), like the global Internet, spans vast geographic distances across countries and continents."
    },
    {
        "id": "cn-q03",
        "subject": "Computer Networks",
        "topic": "Network Topologies",
        "difficulty": "Medium",
        "question": "How many duplex physical links are required to connect $n$ nodes in a fully connected Mesh topology?",
        "options": [
            "$n - 1$",
            "$n$",
            "$n(n - 1) / 2$",
            "$n^2$"
        ],
        "correct": 2,
        "explanation": "In a full mesh topology, every node connects to every other node without self-loops: $\\frac{n(n-1)}{2}$ links."
    },
    {
        "id": "cn-q04",
        "subject": "Computer Networks",
        "topic": "Network Topologies",
        "difficulty": "Easy",
        "question": "Which topology connects all network hosts to a central networking device (such as a switch)?",
        "options": [
            "Bus Topology",
            "Ring Topology",
            "Star Topology",
            "Mesh Topology"
        ],
        "correct": 2,
        "explanation": "In a Star topology, all client devices connect via dedicated point-to-point links to a central hub or switch."
    },
    {
        "id": "cn-q05",
        "subject": "Computer Networks",
        "topic": "OSI Model",
        "difficulty": "Easy",
        "question": "How many layers are specified in the theoretical ISO OSI reference model?",
        "options": [
            "4 layers",
            "5 layers",
            "7 layers",
            "10 layers"
        ],
        "correct": 2,
        "explanation": "The OSI model specifies exactly 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
    },
    {
        "id": "cn-q06",
        "subject": "Computer Networks",
        "topic": "OSI Model",
        "difficulty": "Medium",
        "question": "At which layer of the OSI model do network Routers primarily operate?",
        "options": [
            "Layer 1 (Physical)",
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 4 (Transport)"
        ],
        "correct": 2,
        "explanation": "Routers operate at Layer 3 (Network Layer), inspecting IP addresses to route packets across distinct subnets."
    },
    {
        "id": "cn-q07",
        "subject": "Computer Networks",
        "topic": "OSI Model",
        "difficulty": "Hard",
        "question": "Which layer of the OSI model handles data encryption, compression, and character format translation (e.g. ASCII)?",
        "options": [
            "Application Layer",
            "Presentation Layer",
            "Session Layer",
            "Transport Layer"
        ],
        "correct": 1,
        "explanation": "Layer 6 (Presentation Layer) handles data syntax, encryption, decryption, and data compression formatting."
    },
    {
        "id": "cn-q08",
        "subject": "Computer Networks",
        "topic": "TCP/IP Model",
        "difficulty": "Easy",
        "question": "How many layers comprise the practical TCP/IP Internet model?",
        "options": [
            "3 layers",
            "4 layers",
            "7 layers",
            "6 layers"
        ],
        "correct": 1,
        "explanation": "The standard TCP/IP architecture consists of 4 functional layers: Network Access, Internet, Transport, and Application."
    },
    {
        "id": "cn-q09",
        "subject": "Computer Networks",
        "topic": "IP Address",
        "difficulty": "Easy",
        "question": "What is the total bit length of an IPv4 address and an IPv6 address respectively?",
        "options": [
            "16 bits and 32 bits",
            "32 bits and 128 bits",
            "64 bits and 256 bits",
            "32 bits and 64 bits"
        ],
        "correct": 1,
        "explanation": "IPv4 uses 32 bits (4 bytes), while IPv6 uses 128 bits (16 bytes) to expand the global address space."
    },
    {
        "id": "cn-q10",
        "subject": "Computer Networks",
        "topic": "IP Address",
        "difficulty": "Medium",
        "question": "Which IPv4 address represents the standard local loopback address ('localhost')?",
        "options": [
            "0.0.0.0",
            "192.168.1.1",
            "127.0.0.1",
            "255.255.255.255"
        ],
        "correct": 2,
        "explanation": "`127.0.0.1` is reserved as the IPv4 loopback address (in IPv6, it is `::1`), directing network calls back to the host machine."
    },
    {
        "id": "cn-q11",
        "subject": "Computer Networks",
        "topic": "TCP",
        "difficulty": "Medium",
        "question": "What three packets are exchanged during the TCP Three-Way Handshake to establish a reliable connection?",
        "options": [
            "REQ -> RES -> ACK",
            "SYN -> SYN-ACK -> ACK",
            "PING -> PONG -> ACK",
            "FIN -> ACK -> FIN"
        ],
        "correct": 1,
        "explanation": "TCP establishes a connection via: 1) Client sends SYN, 2) Server replies SYN-ACK, 3) Client acknowledges with ACK."
    },
    {
        "id": "cn-q12",
        "subject": "Computer Networks",
        "topic": "UDP",
        "difficulty": "Easy",
        "question": "Why is UDP preferred over TCP for live video streaming, DNS lookups, and online gaming?",
        "options": [
            "UDP encrypts all traffic using TLS automatically",
            "UDP has lower latency and minimal protocol overhead because it does not require handshakes or retransmissions",
            "UDP guarantees 100% lossless packet delivery",
            "UDP packets are twice the size of TCP packets"
        ],
        "correct": 1,
        "explanation": "UDP avoids the overhead of connection handshakes and retransmissions, offering the low latency essential for real-time applications."
    },
    {
        "id": "cn-q13",
        "subject": "Computer Networks",
        "topic": "HTTP & HTTPS",
        "difficulty": "Easy",
        "question": "Which default TCP port numbers are standardly used for plaintext HTTP and secure HTTPS traffic?",
        "options": [
            "Port 21 and Port 22",
            "Port 25 and Port 110",
            "Port 80 and Port 443",
            "Port 53 and Port 67"
        ],
        "correct": 2,
        "explanation": "Unencrypted HTTP uses port 80; encrypted HTTPS (HTTP over TLS) uses port 443."
    },
    {
        "id": "cn-q14",
        "subject": "Computer Networks",
        "topic": "HTTP & HTTPS",
        "difficulty": "Medium",
        "question": "What does an HTTP 404 response status code signify?",
        "options": [
            "200 OK success",
            "Internal Server Error",
            "Not Found (The server cannot find the requested resource)",
            "Unauthorized Access"
        ],
        "correct": 2,
        "explanation": "HTTP 404 indicates that the client was able to communicate with the server, but the server could not locate the requested resource."
    },
    {
        "id": "cn-q15",
        "subject": "Computer Networks",
        "topic": "DNS",
        "difficulty": "Medium",
        "question": "Which type of DNS record maps a domain name directly to an IPv4 address?",
        "options": [
            "AAAA record",
            "A record",
            "CNAME record",
            "MX record"
        ],
        "correct": 1,
        "explanation": "An 'A' record maps a hostname to a 32-bit IPv4 address; 'AAAA' maps to a 128-bit IPv6 address."
    },
    {
        "id": "cn-q16",
        "subject": "Computer Networks",
        "topic": "Routing",
        "difficulty": "Hard",
        "question": "Which routing protocol is the standard Exterior Gateway Protocol (EGP) used to route traffic between Autonomous Systems across the global Internet?",
        "options": [
            "RIP (Routing Information Protocol)",
            "OSPF (Open Shortest Path First)",
            "BGP (Border Gateway Protocol)",
            "ICMP"
        ],
        "correct": 2,
        "explanation": "BGP (Border Gateway Protocol) is the path-vector protocol that routes data between Autonomous Systems across the core Internet backbone."
    }
]
