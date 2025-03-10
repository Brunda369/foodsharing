package com.example.foodsharing.controller;

import com.example.foodsharing.model.Food;
import com.example.foodsharing.repository.FoodRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/foods")
public class FoodController {

    private final FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // 1️⃣ Get all food donations
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // 2️⃣ Add a new food donation
    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodRepository.save(food);
    }

    // 3️⃣ Claim a food donation
    @PutMapping("/{id}/claim")
    public ResponseEntity<String> claimFood(@PathVariable Long id) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if (optionalFood.isPresent()) {
            Food food = optionalFood.get();
            if (!food.isClaimed()) {
                food.setClaimed(true);
                foodRepository.save(food);
                return ResponseEntity.ok("Food item claimed successfully.");
            } else {
                return ResponseEntity.badRequest().body("Food item is already claimed.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
