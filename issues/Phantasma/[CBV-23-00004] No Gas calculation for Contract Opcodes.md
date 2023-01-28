# No Gas calculation for Contract Opcodes

There was no execution fee for running smart contracts on Phantasma node.

### CBV ID: CBV-23-00004
### Blockchain: Phantasma
### Version affected: -
### Component: VM
### Severity: 8.0
### Vulnerability Type: -
### Credits: @lukeciatt
### Last updated: 28 Jan 2023

## Details

There was no execution fee for running smart contracts on Phantasma node.
It caused the Phantasma node to be highly vulnerable to the DoS attack by running a function of the smart contract which contained an infinite while loop.

To reproduce the bug you have to deploy the below contract and call the test function with very big integer number as an input.
You may see the node gets crashed or freezed.

```cpp
contract while_test {
	public test(a:number):number
	{
		local counter :number := 0;
		while (counter != a){
			counter += 1;
		}
		return counter;
	}
}
```

All the nodes which has the open RPC ports could be affected by this bug.

## Recomendations

You may either deduct the execution fee from the user who is calling the smart contract or define a maximum opcodes or gas inside the VM for running the opcodes.

## References



### Labels: 

## Test



## Aditional comments


