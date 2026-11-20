/**
 * Emotion styles in the document a block is actually rendered in.
 *
 * Since WordPress 6.3 the block editor content can be an iframe, and from 7.0 the
 * post editor always is. Emotion writes its <style> tags to the document it was
 * loaded in (the admin page), so block styles never reached the iframe.
 *
 * Emotion's documented way to style another document is a cache with that
 * document's <head> as `container`, given to the components with CacheProvider.
 * There is one cache per document.
 *
 * - useBlockStyles(): for a block's edit view. Returns the cache for the document
 *   the block's root element is in, and a ref to pass to useBlockProps({ ref }).
 *   The first render uses the admin page; when the root element is attached the
 *   block re-renders with the iframe's cache, still before the browser paints.
 * - <AdminStyles>: for InspectorControls content. The sidebar is always rendered
 *   in the admin page, but React context would otherwise pass it the block's
 *   (iframe) cache.
 */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const { createElement, useCallback, useState } = wp.element;

const caches = new WeakMap();

const getCache = ( doc ) => {
    let cache = caches.get( doc );
    if ( ! cache ) {
        cache = createCache( { key: 'rawb-pb', container: doc.head } );
        caches.set( doc, cache );
    }
    return cache;
};

export const useBlockStyles = () => {
    const [ doc, setDoc ] = useState( () => document );
    const ref = useCallback( ( node ) => {
        if ( node ) {
            setDoc( ( current ) => ( node.ownerDocument === current ? current : node.ownerDocument ) );
        }
    }, [] );
    return { cache: getCache( doc ), ref };
};

export const AdminStyles = ( { children } ) => createElement( CacheProvider, { value: getCache( document ) }, children );

export { CacheProvider };
