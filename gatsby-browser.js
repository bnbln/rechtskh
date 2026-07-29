export const shouldUpdateScroll = () => {
    return [0, 0]
}

export const onRouteUpdate = ({ location }) => {
    if (!location.hash) {
        const focusedElement = document.activeElement
        if (focusedElement?.closest?.(".navigationWrapper")) {
            focusedElement.blur()
        }

        window.requestAnimationFrame(() => {
            window.scrollTo(0, 0)
            window.requestAnimationFrame(() => window.scrollTo(0, 0))
        })
    }
}
