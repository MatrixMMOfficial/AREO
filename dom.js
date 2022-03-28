import { scope } from './scope.js'

function rewriteUrl(url) {
	return prefix + url;
}

console.log('In dom');

// This doesn't work with nested nodes
new MutationObserver((mutations, observer) => {
	console.log(mutations);
	for (let mutation of mutations)
		for (let node of mutation.addedNodes) {
			let stack = [node];

			while (node = stack.pop()) {
				// No need for hashing since it's already safe
				if (node.integrity) {
					element.removeAttribute('integrity');
					node._integrity = node.integrity
				}

				if (node instanceof HTMLScriptElement) {
					const copy = node.cloneNode(true);

					if (node.src)
						node.src = rewriteUrl(node.src);
					if (node.textContent === '') {
						node.textContent = scope(node.textContent);
					}

					node

					// Remove old script
					node.remove();
				}
				if (node.href && !(node instanceof HTMLLinkElement))
					node.href = rewriteUrl(node.href)
				else if (node.action)
					node.action = rewriteUrl(node.href);
				else if (node.src) {
					if (node instanceof HTMLIFrameElement && node.src)
						node.src = rewriteUrl(node.href);
					else if (node instanceof HTMLScriptElement) {
						// Doesn't work on firefox
						node.type = 'javascript-blocked';
					}
				}
			}
		}
}).observe(document, {
	childList: true,
	subtree: true
});