import { performance } from 'node:perf_hooks';

/**
 * University of Pittsburgh Bradford - CIST 0265
 * Homework: Real-World Performance Analysis (Starter)
 */

// TASK 1: Define a 'Student' interface with an id (number) and name (string)
// [Your code here]
interface Student {
    id: number;
    name: string;
}
class StudentRegistry {
    // TASK 2: Define a private array of Student objects
    private students: any[] = []; 

    addStudent(s: any): void {
        // TASK 3: Push student to the array
        this.students.push(s);
    }

    /**
     * TASK 4: Linear Search O(n)
     * Requirement: Use a single loop to find a student by ID.
     */
    findStudentLinear(id: number): any | undefined {
        // [Your code here]
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].id === id) return this.students[i];
        }
        return undefined;
    }
    /**
     * TASK 5: Quadratic Duplicate Check O(n^2)
     * Requirement: Use NESTED loops to compare every student against 
     * every other student to find if any names are duplicated.
     */
    hasDuplicateNames(): boolean {
        // [Your code here]
        for (let i = 0; i < this.students.length; i++) {
            for (let j = i + 1; j < this.students.length; j++) {
                if (this.students[i].name === this.students[j].name) return true;
            }
        }

        return false;
    }
    /**
     * TASK 6: Performance Measurement
     * Fill in the start/end timers for both algorithms.
     */
    runPerformanceTest(): void {
        const testSizes = [10, 100, 1000, 5000];
 
        const results = testSizes.map(n => {
            this.students = [];
            for (let i = 0; i < n; i++) {
                this.addStudent({ id: i, name: `Student ${i}` });
            }
 
            // --- TIME THE LINEAR SEARCH ---
            const linearStart = performance.now();
            this.findStudentLinear(-1);
            const linearEnd = performance.now();
            const linearTime = linearEnd - linearStart;
 
            // --- TIME THE QUADRATIC CHECK ---
            const quadraticStart = performance.now();
            this.hasDuplicateNames();
            const quadraticEnd = performance.now();
            const quadraticTime = quadraticEnd - quadraticStart;
 
            return {
                "Input Size (n)": n.toLocaleString(),
                "Linear (ms)": linearTime.toFixed(4),
                "Quadratic (ms)": quadraticTime.toFixed(4)
            };
        });
 
        console.log("\n--- Lab Results: Algorithmic Growth ---");
        console.table(results);
    }
}
 
const registry = new StudentRegistry();
registry.runPerformanceTest();