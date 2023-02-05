package com.sanonta.sanontabackend.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import com.sanonta.sanontabackend.entities.Proverb;

public class ProverbItemProcessor implements ItemProcessor<Proverb, Proverb> {
    private static final Logger log = LoggerFactory.getLogger(ProverbItemProcessor.class);

    @Override
    public Proverb process(final Proverb proverb) throws Exception {
        final String content = proverb.getContent();
        final Proverb transformedProverb = new Proverb(content);
        log.info("Converting (" + proverb + ") into (" + transformedProverb + ")");

        return transformedProverb;
    }
}
