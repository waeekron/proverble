package com.sanonta.sanontabackend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sanonta.sanontabackend.entities.Proverb;
import com.sanonta.sanontabackend.repositories.*;

import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class ProverbController {
    private final ProverbRepository repository;
    private static Long currentProverb = 1L;
    private LocalDate start = LocalDate.now();

    public ProverbController(ProverbRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value = "/proverbs")
    public Iterable<Proverb> all() {
        return repository
                .findAll();
    }

    @GetMapping("/proverbs/{id}")
    public Proverb one(@PathVariable Long id) {
        return repository
                .findById(id).orElseThrow();
    }

    @PostMapping("/proverbs")
    public Proverb newProverb(@RequestBody Proverb newProverb) {
        return repository
                .save(newProverb);
    }

    @GetMapping("/today")
    public Proverb today() {
        LocalDate today = LocalDate.now();
        int difference = start.compareTo(today);
        if (difference != 0)
            currentProverb++;
        return repository.findById(currentProverb).orElseThrow();
    }
}
