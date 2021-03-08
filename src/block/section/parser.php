<?php
    // Get available templates from JSON
    $templates = json_decode(file_get_contents(__DIR__ . '/templates.json'));

    add_filter('headless_helper__next24hr/section', function($block, $format_blocks) use ($templates) {

        $exclude_from_dynamic_list = array(
            'backgroundType',
            'backgroundValue',
            'templateSelected',
            'blocks',
            'template',
            'tag',
        );

        $parsed_block = new stdclass();

       // If background wasn't properly set by user convert it to the default 'transparent' value
        if ( $block->attrs['backgroundType'] === 'image' && $block->attrs['backgroundValue'] === null ) {
            $parsed_block->backgroundType = 'transparent';
        } else {
            $parsed_block->backgroundType = $block->attrs['backgroundType'];
        }

        // Autocopy all attributes
        foreach ($block->attrs as $key => $value) {
            if (!in_array($key, $exclude_from_dynamic_list)) {
                if ($key == 'sectionWidth') {
                    $parsed_block->width = $block->attrs[$key];
                } else if ($key == 'heightSetting') {
                    $parsed_block->minHeight = $block->attrs[$key];
                } else {
                    $parsed_block->{$key} = $block->attrs[$key];
                }
            }
        }

        // If there's no backgroundValue no need to output that property
        if ( $block->attrs['backgroundValue'] !== null ) {
            if ( $block->attrs['backgroundType'] === 'image' ) {
                $parsed_block->backgroundValue = array(
                    '__isimage' => true,
                    'url' => $block->attrs['backgroundValue']['url'],
                    'width' => $block->attrs['backgroundValue']['width'],
                    'height' => $block->attrs['backgroundValue']['height'],
                );
            } else {
                $parsed_block->backgroundValue = $block->attrs['backgroundValue'];
            }
        }

        $template = [];
        $templateSelected = $block->attrs['templateSelected'] ?? $templates[0]; // Fallback to default
        foreach ($templateSelected as $templ) {
            $template[] = $templ[1];
        }

        $parsed_block->template = $template;
        $parsed_block->blocks = $format_blocks($block->innerBlocks);
        $parsed_block->tag = 'section';

        return $parsed_block;
    }, 10, 2);

    // This component is part of the section component (only exists as a child of section component)
    add_filter('headless_helper__next24hr/column', function($block, $format_blocks) {
        $parsed_block = new stdclass();

        $parsed_block->blocks = $format_blocks($block->innerBlocks);

        $exclude_from_dynamic_list = array(
            'blocks',
            'tag',
        );

        // Autocopy all attributes
        foreach ($block->attrs as $key => $value) {
            if (!in_array($key, $exclude_from_dynamic_list)) {
                if ($key === 'sectionWidth') {
                    $parsed_block->width = $block->attrs[$key];
                } else if ($key == 'heightSetting') {
                    $parsed_block->minHeight = $block->attrs[$key];
                } else {
                    $parsed_block->{$key} = $block->attrs[$key];
                }
            }
        }

        return $parsed_block;
    }, 10, 2);

    add_filter( 'allowed_block_types', function ( $allowed_blocks ) {
        array_push(
            $allowed_blocks,
            'next24hr/column',
            'next24hr/section',
        );
        return $allowed_blocks;
    }, 100);


