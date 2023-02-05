package com.sanonta.sanontabackend.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;

import com.sanonta.sanontabackend.entities.Proverb;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;

@Configuration
public class BatchConfiguration {
    @Bean
    public FlatFileItemReader<Proverb> reader() {
        return new FlatFileItemReaderBuilder<Proverb>()
                .name("proverbItemReader")
                .resource(new ClassPathResource("proverbs.csv"))
                .delimited()
                .names(new String[] { "content" })
                .fieldSetMapper(new BeanWrapperFieldSetMapper<Proverb>() {
                    {
                        setTargetType(Proverb.class);
                    }
                }).build();
    }

    @Bean
    public ProverbItemProcessor processor() {
        return new ProverbItemProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<Proverb> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<Proverb>()
                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
                .sql("INSERT INTO proverb (content) VALUES (:content)")
                .dataSource(dataSource)
                .build();
    }

    @Bean
    public Job importUserJob(JobRepository jobRepository,
            JobCompletionNotificationListener listener, Step step1) {
        return new JobBuilder("importUserJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(step1)
                .end()
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,
            PlatformTransactionManager transactionManager, JdbcBatchItemWriter<Proverb> writer) {
        return new StepBuilder("step1", jobRepository)
                .<Proverb, Proverb>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer)
                .build();
    }

}
