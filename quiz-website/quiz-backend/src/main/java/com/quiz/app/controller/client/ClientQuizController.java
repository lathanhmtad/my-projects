package com.quiz.app.controller.client;

import com.quiz.app.constants.AppConstants;
import com.quiz.app.dto.ListResponse;
import com.quiz.app.dto.quiz.ClientQuizQAResponse;
import com.quiz.app.dto.quiz.ClientQuizResponse;
import com.quiz.app.entity.quiz.Quiz;
import com.quiz.app.mapper.ClientQuizMapper;
import com.quiz.app.mapper.ClientQuizQAMapper;
import com.quiz.app.repository.QuizRepo;
import com.quiz.app.service.GenericService;
import jakarta.annotation.Nullable;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/client-api/quizzes")
@AllArgsConstructor
public class ClientQuizController {
    private ApplicationContext context;
    private GenericService<Quiz, ObjectUtils.Null, ClientQuizResponse> clientQuizService;
    private GenericService<Quiz, ObjectUtils.Null, ClientQuizQAResponse> clientQuizQAService;

    @PostConstruct
    public void initService() {
        clientQuizService.init(
                context.getBean(QuizRepo.class),
                context.getBean(ClientQuizMapper.class),
                null,
                null
        );

        clientQuizQAService.init(
                context.getBean(QuizRepo.class),
                context.getBean(ClientQuizQAMapper.class),
                null,
                null
        );
    }

    @GetMapping
    public ResponseEntity<ListResponse<ClientQuizResponse>> getAll(
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter,
            @RequestParam(name = "search", required = false) @Nullable String search,
            @RequestParam(name = "all", required = false) boolean all
    ) {
        return ResponseEntity.ok(
                clientQuizService.findAll(page, size, sort, filter, search, all)
        );
    }

    @GetMapping("/q-a/{id}")
    public ResponseEntity<ClientQuizQAResponse> getAll(@PathVariable("id") Long quizId) {
        return ResponseEntity.ok(clientQuizQAService.findById(quizId));
    }
}
