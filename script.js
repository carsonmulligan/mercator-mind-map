document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('mindMapCanvas');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('nodeInput');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let nodes = [];
    let currentNode = null;

    function drawNode(node) {
        ctx.beginPath();
        ctx.rect(node.x, node.y, node.width, node.height);
        ctx.fillStyle = 'skyblue';
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2);
    }

    function drawLines(node) {
        if (node.parent) {
            ctx.beginPath();
            ctx.moveTo(node.parent.x + node.parent.width / 2, node.parent.y + node.parent.height);
            ctx.lineTo(node.x + node.width / 2, node.y);
            ctx.stroke();
        }
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            drawLines(node);
            drawNode(node);
        });
    }

    function addNode(text, asSibling = false) {
        const baseX = 50, baseY = 50, width = 100, height = 50, margin = 10;
        let newNode = { text: text, width: width, height: height, parent: null };
        
        if (!currentNode || asSibling && !currentNode.parent) {
            newNode.x = baseX + nodes.length * (width + margin);
            newNode.y = baseY;
        } else if (asSibling) {
            newNode.x = currentNode.x;
            newNode.y = currentNode.y + height + margin;
            newNode.parent = currentNode.parent;
        } else {
            newNode.x = currentNode.x + width + margin;
            newNode.y = currentNode.y;
            newNode.parent = currentNode;
        }

        nodes.push(newNode);
        currentNode = newNode;
        render();
    }

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.shiftKey) {
            addNode(input.value); // Add child node
            input.value = '';
            e.preventDefault();
        } else if (e.key === 'Tab' && e.shiftKey) {
            addNode(input.value, true); // Add sibling node
            input.value = '';
            e.preventDefault();
        }
    });

    // Initial node
    addNode('Start Node');
});

